'use strict';

// AWS API
var _ = require('lodash');
var AWS = require('aws-sdk'),
    crypto = require('crypto'),
    config = require('./aws.json'),
    createS3Policy,
    getExpiryTime;

getExpiryTime = function () {
    var _date = new Date();
    return '' + (_date.getFullYear()) + '-' + (_date.getMonth() + 1) + '-' +
        (_date.getDate() + 1) + 'T' + (_date.getHours() + 3) + ':' + '00:00.000Z';
};

createS3Policy = function(contentType, callback) {
    var date = new Date();
    var s3Policy = {
        'expiration': getExpiryTime(),
        'conditions': [
            ['starts-with', '$key', 'images/'],
            {'bucket': config.bucket},
            {'acl': 'public-read'},
            ['starts-with', '$Content-Type', contentType],
            {'success_action_status' : '201'}
        ]
    };

    // stringify and encode the policy
    var stringPolicy = JSON.stringify(s3Policy);
    var base64Policy = new Buffer(stringPolicy, 'utf-8').toString('base64');

    // sign the base64 encoded policy
    var signature = crypto.createHmac('sha1', config.secretAccessKey)
                        .update(new Buffer(base64Policy, 'utf-8')).digest('base64');

    // build the results object
    var s3Credentials = {
        s3Policy: base64Policy,
        s3Signature: signature,
        AWSAccessKeyId: config.accessKeyId
    };

    // send it back
    callback(s3Credentials);
};

exports.getS3Policy = function(req, res) {
    createS3Policy(req.query.mimeType, function (creds, err) {
        if (!err) {
            return res.send(200, creds);
        } else {
            return res.send(500, err);
        }
    });
};

exports.index = function(req, res) {
    // createS3Policy(req.query.mimeType, function (creds, err) {
    //     if (!err) {
    //         return res.send(200, creds);
    //     } else {
    //         return res.send(500, err);
    //     }
    // });
    return res.json(200, {
        aws: {
            bucket: config.bucket
        }
    });
};


exports.getAwsConfig = function (req, res, next) {
    return res.json(200, {
        aws: {
            bucket: config.bucket
        }
    });
};




// var S3Upload = require('./s3Upload.model');
//
// // Get list of s3Uploads
// exports.index = function(req, res) {
//   S3Upload.find(function (err, s3Uploads) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, s3Uploads);
//   });
// };
//
// // Get a single s3Upload
// exports.show = function(req, res) {
//   S3Upload.findById(req.params.id, function (err, s3Upload) {
//     if(err) { return handleError(res, err); }
//     if(!s3Upload) { return res.send(404); }
//     return res.json(s3Upload);
//   });
// };
//
// // Creates a new s3Upload in the DB.
// exports.create = function(req, res) {
//   S3Upload.create(req.body, function(err, s3Upload) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, s3Upload);
//   });
// };
//
// // Updates an existing s3Upload in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   S3Upload.findById(req.params.id, function (err, s3Upload) {
//     if (err) { return handleError(res, err); }
//     if(!s3Upload) { return res.send(404); }
//     var updated = _.merge(s3Upload, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(res, err); }
//       return res.json(200, s3Upload);
//     });
//   });
// };
//
// // Deletes a s3Upload from the DB.
// exports.destroy = function(req, res) {
//   S3Upload.findById(req.params.id, function (err, s3Upload) {
//     if(err) { return handleError(res, err); }
//     if(!s3Upload) { return res.send(404); }
//     s3Upload.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };
//
// function handleError(res, err) {
//   return res.send(500, err);
// }
