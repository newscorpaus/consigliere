'use strict';
var Scheduler = {};
var mAccounts = require('../models/accounts');
var CronJob = require('cron').CronJob;
var statFetcher = require('./statfetcher');
var config = require('config');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)({ 'timestamp': true }),
      new (winston.transports.File)({ 'timestamp': true, filename: '/var/log/consigliere/scheduler.log' })
    ]
});

//
// scheduleSingle - for the given account, get the TA stats
// then set up a cron job to refresh the TA stats
//
Scheduler.scheduleSingle = function(account) {
  statFetcher.fetchStatsFor(account);
  return new CronJob({
    cronTime: config.Scheduler.CronPattern,
    onTick: function() {
      statFetcher.fetchStatsFor(account);
    },
    start: true
  });
};

Scheduler.loadFromDatabase = function(callback) {
  mAccounts.scan({},function(err,accounts) {
    if (!err) {
      logger.info("Lib/Scheduler | Accounts list retrieved successfully");
      let cronjob_list = {};
      accounts.forEach(function(account) {
        logger.info("Lib/Scheduler | Scheduling check for Account " + account.accountName + "(" + account.accountNumber + ")");
        cronjob_list[account.accountNumber] = Scheduler.scheduleSingle(account);
      });
      callback(null, cronjob_list);
    }
    else {
      let error_msg = "Lib/Scheduler | Accounts scan operation failed";
      logger.error(error_msg);
      callback(new Error(error_msg));
    }
  });
};

module.exports = Scheduler;
