'use strict';

var dynamoose = require('dynamoose');
var config = require('config');
var Schema = dynamoose.Schema;

dynamoose.AWS.config.update({ region: config.Defaults.AWS.Dynamo.Region });

var accountSchema = new Schema({
  accountName: {
    type: String,
    required: true,
    rangeKey: true
  },
  type: {
    type: String,
    required: true,
    validate : function(value) {
      if (value == 'master' || value == 'slave') {
        return true;
      }
      else {
        return false;
      }
    }
  },
  choice: {
    type: String
  },
  roleArn: {
    type: String
  },
  accessKey: {
    type: String
  },
  accessSecret: {
    type: String
  },
  accountNumber: {
    type: String,
    required: true,
    hashKey: true
  },
  created_at: {
    type: Date,
    default : function() {
      var currentDate = new Date();
      return currentDate;
    }
  },
  updated_at: {
    type: Date,
    default: function() {
      var currentDate = new Date();
      return currentDate;
    }
  },
  refreshStatus: {
    type: String
  },
  lastRefreshed : {
    type: Date
  },
  lastRefreshStatus: {
    type: String
  },
  lastRefreshReason: {
    type: String
  }
});


var Account = dynamoose.model(config.Defaults.AWS.Dynamo.Table, accountSchema);

module.exports = Account;
