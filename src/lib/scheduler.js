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

Scheduler.scheduleSingle = function(account) {
  statFetcher.fetchStatsFor(account);
  new CronJob({
    cronTime: config.Scheduler.CronPattern,
    onTick: function() {
      statFetcher.fetchStatsFor(account);
    },
    start: true
  });
};

Scheduler.loadFromDatabase = function() {
  mAccounts.scan({},function(err,accounts) {
    if (!err) {
      logger.info("Lib/Scheduler | Accounts list retrieved successfully");
      accounts.forEach(function(account) {
        logger.info("Lib/Scheduler | Scheduling check for Account " + account.accountName + "(" + account.accountNumber + ")");
        Scheduler.scheduleSingle(account);
      });
    }
    else {
      logger.error("Lib/Scheduler | Accounts scan operation failed");
    }
  });
};

module.exports = Scheduler;
