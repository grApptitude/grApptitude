'use strict';

var _ = require('lodash');
var NewGrapp = require('./newGrapp.model');

// Get list of newGrapps
exports.index = function(req, res) {
  NewGrapp.find(function (err, newGrapps) {
    if(err) { return handleError(res, err); }
    return res.json(200, newGrapps);
  });
};

// Get a single newGrapp
exports.show = function(req, res) {
  NewGrapp.findById(req.params.id, function (err, newGrapp) {
    if(err) { return handleError(res, err); }
    if(!newGrapp) { return res.send(404); }
    return res.json(newGrapp);
  });
};

// Creates a new newGrapp in the DB.
exports.create = function(req, res) {
  NewGrapp.create(req.body, function(err, newGrapp) {
    if(err) { return handleError(res, err); }
    return res.json(201, newGrapp);
  });
};

// Updates an existing newGrapp in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  NewGrapp.findById(req.params.id, function (err, newGrapp) {
    if (err) { return handleError(res, err); }
    if(!newGrapp) { return res.send(404); }
    var updated = _.merge(newGrapp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, newGrapp);
    });
  });
};

// Deletes a newGrapp from the DB.
exports.destroy = function(req, res) {
  NewGrapp.findById(req.params.id, function (err, newGrapp) {
    if(err) { return handleError(res, err); }
    if(!newGrapp) { return res.send(404); }
    newGrapp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}