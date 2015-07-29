'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewGrappSchema = new Schema({
  authorId: String,
  userName: String,
  user: String,
  userImg: String,
  grapp: String,
  timestamp: Date,
  attachUrl: String,
  tagedUser: String
});

module.exports = mongoose.model('NewGrapp', NewGrappSchema);
