'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'grapptitude-secret',

  FACEBOOK_ID:      '513143692172192',
  FACEBOOK_SECRET:  'b83d7540eb0d628508a01e7314895e17',

  TWITTER_ID:       'keEg60ub9dQNGA7z9BDF6wT0q',
  TWITTER_SECRET:   '9BNHeMox0nI3IX3ZI99CCensgrzMYu9nEfwH3qiERohGnP4dIx',

  GOOGLE_ID:        '975113009671-r9k63cam55k3env6shmtit1588v7vqat.apps.googleusercontent.com',
  GOOGLE_SECRET:    'psu7Bd8P3NX5ZRgiS1Jrayt9',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
