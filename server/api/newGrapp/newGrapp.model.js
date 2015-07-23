'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewGrappSchema = new Schema({
  author_Id: String,
  grapp: String,
  timestamp: Date,
  attachUrl: String,
  tagedUser: String
});

module.exports = mongoose.model('NewGrapp', NewGrappSchema);
