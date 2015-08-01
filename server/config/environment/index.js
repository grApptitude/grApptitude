'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'grapptitude-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '513143692172192',
    clientSecret: process.env.FACEBOOK_SECRET || 'b83d7540eb0d628508a01e7314895e17',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'keEg60ub9dQNGA7z9BDF6wT0q',
    clientSecret: process.env.TWITTER_SECRET || '9BNHeMox0nI3IX3ZI99CCensgrzMYu9nEfwH3qiERohGnP4dIx',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '975113009671-r9k63cam55k3env6shmtit1588v7vqat.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'psu7Bd8P3NX5ZRgiS1Jrayt9',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  aws: {
    bucket:          process.env.AWS_bucket
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
