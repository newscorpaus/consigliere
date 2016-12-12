'use strict';

var StatFetcher = {};
var auth = require('./auth');
var config = require('config');
var redis = require("redis");
var async = require('async');
var _ = require('lodash');
var mAccounts = require('../models/accounts');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
  new (winston.transports.Console)({ 'timestamp': true }),
    new (winston.transports.File)({ 'timestamp': true, filename: '/var/log/consigliere/statfetcher.log' })
  ]
});


let client = redis.createClient(process.env.REDIS_URL || 'redis://127.0.0.1/6379');

client.on("error", function(err) {
  logger.error("DataStore/Redis | Error on redis connection | " + err.toString());
});

StatFetcher.fetchStatsFor = function(account) {
  logger.info("Lib/StatFetcher | Starting to fetch TA stats for " + account.accountName + "(" + account.accountNumber + ")");
  auth.getSupport(account, function(err, support) {
    if (!err) {
      logger.info("Successfully got support object for " + account.accountName + "(" + account.accountNumber + ")");
      var params = {
        language: config.Defaults.AWS.Support.Language
      };
      support.describeTrustedAdvisorChecks(params, function(err, data) {
        if (err) {
          logger.error("Failed to get checks for " + account.accountName + "(" + account.accountNumber + ")");
          let currentDate = new Date();
          account.lastRefreshed = currentDate;
          account.lastRefreshStatus = "failed";
          account.save();
        }
        else {
          //update last refreshed
          logger.info("Successfully got checks for " + account.accountName + "(" + account.accountNumber + ")");
          let currentDate = new Date();
          account.lastRefreshed = currentDate;
          account.lastRefreshStatus = "success";
          account.save(function(err) {
            if (!err) {
              logger.info("Successfully saved lastRefreshed stats for " + account.accountName + "(" + account.accountNumber + ")");
              client.set(account.accountNumber + '_checks', JSON.stringify(data));
              var checkIds = [];
              data.checks.forEach(function(check) {
                checkIds.push(check.id);
                var params = {
                  checkId: check.id,
                  language: config.Defaults.AWS.Support.Language
                };
                support.describeTrustedAdvisorCheckResult(params, function(err, data) {
                  if (err) {
                    logger.error("Failed to get check results (" + check.id + ") for " + account.accountName + "(" + account.accountNumber + ")");
                  }
                  else {
                    logger.info("Successfully retrieved check results (" + check.id + ") for " + account.accountName + "(" + account.accountNumber + ")");
                    client.set(account.accountNumber + '_result_' + check.id, JSON.stringify(data));
                  }
                });
              });
              var params = {
                checkIds : checkIds
              };
              support.describeTrustedAdvisorCheckSummaries(params, function(err, data) {
                if (err) {
                  logger.error("Failed to get check summaries for " + account.accountName + "(" + account.accountNumber + ")");
                }
                else {
                  logger.info("Successfully retrieved check summaries for " + account.accountName + "(" + account.accountNumber + ")");
                  client.set(account.accountNumber + '_summaries', JSON.stringify(data));
                }
              });
            }
            else {
              logger.error("Failed to save lastRefreshed stats for " + account.accountName + "(" + account.accountNumber + ")");
            }
          });
        }
      });
    }
    else {
      //failed to get auth object
      logger.error("Failed to get support object for " + account.accountName + "(" + account.accountNumber + ")");
      var currentDate = new Date();
      account.lastRefreshed = currentDate;
      account.lastRefreshStatus = "failed";
      account.save();
    }
  });
};

StatFetcher.getStatsForAccount = function(account, callback) {
  client.keys(account.accountNumber + '_*', function(err, replies) {
    if (!err) {
      console.log(replies);
    }
    else {
      logger.error("Lib/StatFetcher | Failed to get keys from Redis for " + account.accountName + "(" + account.accountNumber + ")");
      callback(err);
    }
  });
};

StatFetcher.getSummaryForCategoryForAll = function(category,callback) {
  mAccounts.scan({}, function(err, accounts) {
    if (!err) {
      var calls = [];
      var checks = [];
      var summaries = [];
      accounts.forEach(function(account) {
        calls.push(function(hollaback) {
          client.get(account.accountNumber + '_checks', function(err, checkList) {
            if (!err) {
              var returnedChecks = JSON.parse(checkList);
              returnedChecks.checks.forEach(function(check) {
                if (check.category == category) {
                  checks.push({ accountName: account.accountName, accountNumber: account.accountNumber, check: check });
                }
              });
              client.get(account.accountNumber + '_summaries', function(err, summaryList) {
                if (!err) {
                  var returnedSummaries = JSON.parse(summaryList);
                  returnedSummaries.summaries.forEach(function(summary) {
                    summaries.push({ accountName: account.accountName, accountNumber: account.accountNumber, summary:summary });
                  });
                  hollaback();
                }
                else {
                  hollaback(err);
                }
              });
            }
            else {
              hollaback(err);
            }
          });
        });
      });
      async.parallel(calls, function(err) {
        if (!err) {
          calls = [];
          var detailedChecks = [];
          checks.forEach(function(check) {
            calls.push(function(hollaback) {
              client.get(check.accountNumber + '_result_' + check.check.id, function(err, res) {
                if (!err) {
                  var returnedCheckDetail = JSON.parse(res);
                  detailedChecks.push({ accountNumber: check.accountNumber, accountName: check.accountName, result: returnedCheckDetail.result });
                  hollaback();
                }
                else {
                  hollaback(err);
                }
              });
            });
          });
          async.parallel(calls, function(err) {
            if (!err) {
              // console.log('%j',detailedChecks);
              // consolidate checks by name
              var consolidatedChecks = [];
              checks.forEach(function(check) {
                let found = false;
                let foundIndex = -1;
                consolidatedChecks.forEach(function(consolidatedCheck, index) {
                  if (consolidatedCheck.name == check.check.name) {
                    found = true;
                    foundIndex = index;
                  }
                });
                var foundSummary;
                summaries.forEach(function(summary) {
                  if (summary.summary.checkId == check.check.id && summary.accountNumber == check.accountNumber) {
                    foundSummary = summary.summary;
                  }
                });
                var foundDetail;
                detailedChecks.forEach(function(detailedCheck) {
                  if (detailedCheck.accountNumber == check.accountNumber && check.check.id == detailedCheck.result.checkId) {
                    foundDetail = detailedCheck.result;
                  }
                });
                var mergedCheckSummary = _.merge(foundSummary, check.check);
                mergedCheckSummary = _.merge(mergedCheckSummary, foundDetail);
                mergedCheckSummary = _.merge(mergedCheckSummary, { accountNumber: check.accountNumber, accountName: check.accountName });
                if (found === true) {
                  // name exists, add check to it.
                  consolidatedChecks[foundIndex].checks.push(mergedCheckSummary);
                }
                else {
                  // name doesn't exist yet, create it with a single element check array
                  consolidatedChecks.push({ description: check.check.description, name: check.check.name, checks: [mergedCheckSummary] });
                }
              });
              callback(null, consolidatedChecks);
            }
            else {
              callback(err);
            }
          });
        }
        else {
          callback(err);
        }
      });

    }
    else {
      callback(err);
    }
  });
};

StatFetcher.getStatusCountsForAccount = function(account, callback) {
  client.get(account.accountNumber + '_summaries', function(err, data) {
    if (!err) {
      var counts = {
        security : {
          not_available :0,
          error:0,
          warning:0,
          ok:0
        },
        performance : {
          not_available :0,
          error:0,
          warning:0,
          ok:0
        },
        cost_optimizing : {
          not_available :0,
          error:0,
          warning:0,
          ok:0
        },
        fault_tolerance : {
          not_available :0,
          error:0,
          warning:0,
          ok:0
        }
      };
      var summaries = JSON.parse(data);
      client.get(account.accountNumber + '_checks', function(err, data) {
        if (!err) {
          var checks = JSON.parse(data);
          summaries.summaries.forEach(function(summary) {
            checks.checks.forEach(function(check) {
              if (summary.checkId == check.id) {
                counts[check.category][summary.status] = counts[check.category][summary.status] + 1;
              }
            });
          });
          callback(null, counts);
        }
        else {
          callback(err);
        }
      });

    }
    else {
      callback(err);
    }
  });
};

StatFetcher.getStatusCountsForAll = function(callback) {
  mAccounts.scan({}, function(err, accounts) {
    if (!err) {
      var calls = [];
      var counts = [];
      accounts.forEach(function(account) {
        calls.push(function(hollaback) {
          StatFetcher.getStatusCountsForAccount(account, function(err, res) {
            if (!err) {
              counts.push({ account:account, counts:res });
              hollaback();
            }
            else {
              hollaback(err);
            }
          });
        });
      });
      async.parallel(calls, function(err) {
        if (!err) {
          callback(null, counts);
        }
        else {
          callback(err);
        }
      });
    }
    else {
      callback(err);
    }
  });
};

/*
 * fetchStatsForAll: for all the accounts in the DB, fetch all their stats
 * N.B. given fetchStatsFor() is not an async method with a callback, we cannot
 * know when it returns, and therefore we are just blindly calling it for each account
 * until we get to the end of the list; it is up to the person calling this function
 * to determine when to stop its execution
 * TODO: make fetchStatsFor() an async function
 */
StatFetcher.fetchStatsForAll = function(callback) {
  mAccounts.scan({}, function(err, accounts) {
    if (!err) {
      accounts.forEach(function(account) {
        StatFetcher.fetchStatsFor(account);
      });
      callback(null);
    }
    else {
      callback(err);
    }
  });
};

module.exports = StatFetcher;
