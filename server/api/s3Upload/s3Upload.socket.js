/**
 * Broadcast updates to client when the model changes
 */

// 'use strict';
//
// var S3Upload = require('./s3Upload.model');
//
// exports.register = function(socket) {
//   S3Upload.schema.post('save', function (doc) {
//     onSave(socket, doc);
//   });
//   S3Upload.schema.post('remove', function (doc) {
//     onRemove(socket, doc);
//   });
// }
//
// function onSave(socket, doc, cb) {
//   socket.emit('s3Upload:save', doc);
// }
//
// function onRemove(socket, doc, cb) {
//   socket.emit('s3Upload:remove', doc);
// }
