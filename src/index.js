'use strict';
var Hapi = require('hapi');
var Hoek = require('hoek');
var mAccounts = require('./models/accounts');
var scheduler = require('./lib/scheduler');
var statFetcher = require('./lib/statfetcher');
var auth = require('./lib/auth');
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
      new (winston.transports.Console)({ 'timestamp':true }),
      new (winston.transports.File)({ 'timestamp':true,filename:'/var/log/consigliere/consigliere.log' })
    ]
});

scheduler.loadFromDatabase();

var server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.register(require('vision'), function(err) {

  Hoek.assert(!err, err);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
  });
  server.register(require('inert'), function(err) {

    Hoek.assert(!err,err);
    server.route({
      method: 'GET',
      path: '/favicon.ico',
      handler: {
        file: './public/images/favicon.png'
      }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: function(request, reply) {
        mAccounts.scan({}, function(err, accounts) {
          if (!err) {
            logger.info("View/index : Rendering index");
            reply.view('index', { accounts: accounts });
          }
          else {
            logger.error("Model/accounts : Accounts Scan operation failed " + err.toString());
          }
        });

      }
    });

    // GET list of accounts
    server.route({
      method: 'GET',
      path: '/api/accounts',
      handler: function(request, reply) {
        mAccounts.scan({}, function(err,accounts) {
          if (!err) {
            logger.info("Model/accounts : GET /api/accounts | List of accounts");
            reply(accounts);
          }
          else {
            logger.error("Model/accounts : GET /api/accounts | Accounts Scan operation failed " + err.toString());
          }
        });
      }
    });
    // POST (save) an account
    server.route({
      method: 'POST',
      path: '/api/accounts',
      handler: function(request,reply) {
        var account = new mAccounts();
        if (typeof request.payload.accountName != 'undefined') {
          account.accountName = request.payload.accountName;
        }

        if (typeof request.payload.accountNumber != 'undefined') {
          account.accountNumber = request.payload.accountNumber;
        }

        if (typeof request.payload.type != 'undefined') {
          account.type = request.payload.type;
        }

        if (typeof request.payload.roleArn != 'undefined') {
          account.roleArn = request.payload.roleArn;
        }

        if (typeof request.payload.accessKey != 'undefined') {
          account.accessKey = request.payload.accessKey;
        }

        if (typeof request.payload.accessSecret != 'undefined') {
          account.accessSecret = request.payload.accessSecret;
        }

        if (typeof request.payload.choice != 'undefined') {
          account.choice = request.payload.choice;
        }

        account.save(function(err) {
          if (!err) {
            // Kick off cron after adding account
            logger.info("Model/accounts : POST /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " save operation successful");
            scheduler.scheduleSingle(account);
            reply(account).code(201);
          }
          else {
            logger.error("Model/accounts : POST /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " save operation failed | " + err.toString());
          }
        });
      }
    });
    //PUT (update) an account
    server.route({
      method: 'PUT',
      path: '/api/accounts',
      handler: function(request,reply) {
        mAccounts.query('accountNumber').eq(request.payload.accountNumber).exec(function(err,account) {
          if (err) {
            logger.error("Model/Accounts : PUT /api/accounts | Dynamo query failed | " + err.toString());
            reply("Failed").code(400);
          }
          else {
            if (typeof request.payload.accountName != 'undefined') {
              account.accountName = request.payload.accountName;
            }

            if (typeof request.payload.type != 'undefined') {
              account.type = request.payload.type;
            }

            if (typeof request.payload.roleArn != 'undefined') {
              account.roleArn = request.payload.roleArn;
            }

            if (typeof request.payload.accessKey != 'undefined') {
              account.accessKey = request.payload.accessKey;
            }

            if (typeof request.payload.accessSecret != 'undefined') {
              account.accessSecret = request.payload.accessSecret;
            }

            if (typeof request.payload.choice != 'undefined') {
              account.choice = request.payload.choice;
            }

            account.update(function(err) {
              if (!err) {
                logger.info("Model/accounts : PUT /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " update operation successful");
                reply(account).code(202);
              }
              else {
                logger.error("Model/accounts : PUT /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " save operation failed | " + err.toString());
              }
            });
          }
        });
      }
    });
    // DELETE an account
    server.route({
      method: 'DELETE',
      path: '/api/accounts',
      handler: function(request,reply) {
        mAccounts.queryOne('accountNumber').eq(request.payload.accountNumber).exec(function(err,account) {
          if (err) {
            logger.error("Model/Accounts : DELETE /api/accounts | Dynamo query failed | " + err.toString());
            reply("Failed").code(400);
          }
          else {
            account.delete(function(err) {
              if (err) {
                logger.error("Model/accounts : DELETE /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " delete operation failed | " + err.toString());
                reply("Failed").code(500);
              }
              else {
                logger.info("Model/accounts : DELETE /api/accounts | Account " + account.accountName + "(" + account.accountNumber + ")" + " delete operation successful");
                reply("Deleted").code(204);
              }
            });
          }
        });
      }
    });
    server.route({
      method: 'GET',
      path: '/api/accounts/statuscounts',
      handler : function(request,reply) {
        statFetcher.getStatusCountsForAll(function(err,res) {
          if (!err) {
            logger.info("Lib/StatFetcher : GET /api/accounts/statuscounts | Retrieved counts stats");
            reply(res).code(200);
          }
          else {
            logger.error("Lib/StatFetcher : GET /api/accounts/statuscounts | Failed to Retrieve counts stats | " + err.toString());
            reply(err).code(400);
          }
        });
      }
    });
    server.route({
      method: 'POST',
      path: '/api/authtest',
      handler: function(request,reply) {
        auth.getSupport(request.payload,function(err,support) {
          var params = {
            language: 'en'
          };
          support.describeTrustedAdvisorChecks(params, function(err) {
            if (err) {
              logger.error("Lib/Auth : POST /api/authtest | Failed to get trusted advisor checks | " + err.toString());
              reply({ "result" : "failed" }).code(400);
            }
            else {
              logger.info("Lib/Auth : POST /api/authtest | Successfully got trusted advisor checks");
              reply({ "result" : "success" }).code(200);
            }
          });
        });
      }
    });
    server.route({
      method: 'GET',
      path: '/api/category/{category}',
      handler : function(request,reply) {
        statFetcher.getSummaryForCategoryForAll(request.params.category, function(err, res) {
          if (!err) {
            logger.info("Lib/StatFetcher : GET /api/category/" + request.params.category + " | Successfully got summary category for all accounts");
            reply(res).code(200);
          }
          else {
            logger.error("Lib/StatFetcher : GET /api/category/" + request.params.category + " | Failed to get summary category for all accounts | " + err.toString());
            reply(err).code(500);
          }
        });
      }
    });

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: __dirname + '/public'
        }
      }
    });

    server.start(function() {
      logger.info("Server running at " + server.info.uri);
    });
  });
});
