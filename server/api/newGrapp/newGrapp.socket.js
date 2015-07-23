/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var NewGrapp = require('./newGrapp.model');

exports.register = function(socket) {
  NewGrapp.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  NewGrapp.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('newGrapp:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('newGrapp:remove', doc);
}