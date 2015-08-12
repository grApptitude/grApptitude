'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, User, Auth, $location, Upload) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;


    // $scope.$watch('files', function () {
    //   console.log($scope.files);
    //   $scope.upload($scope.files);
    // });
    //
    // $scope.upload = function (files) {
    //
    //         var getPolicy = function (file) {
    //         $http.get('/api/s3Uploads/s3Policy?mimeType='+ file.type).success(function(response) {
    //             var s3Params = response;
    //             console.log(s3Params);
    //             Upload.upload({
    //                 url: 'https://' + 'img.grapptitude.com' + '.s3.amazonaws.com/',
    //                 method: 'POST',
    //                 transformRequest: function (data, headersGetter) {
    //                     //Headers change here
    //                     var headers = headersGetter();
    //                     delete headers['Authorization'];
    //                     return data;
    //                 },
    //                 data: {
    //                     'key' : 'images/'+ Math.round(Math.random()*10000) + '$$' + file.name,
    //                     'acl' : 'public-read',
    //                     'Content-Type' : file.type,
    //                     'AWSAccessKeyId': s3Params.AWSAccessKeyId,
    //                     'success_action_status' : '201',
    //                     'Policy' : s3Params.s3Policy,
    //                     'Signature' : s3Params.s3Signature
    //                 },
    //                 file: file,
    //               }).progress(function (evt) {
    //                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //                 console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    //               }).success(function (data, status, headers, config) {
    //                 console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    //               }).error(function (data, status, headers, config) {
    //                 console.log('error status: ' + status);
    //               });
    //       });
    //     };
    //
    //       if (files && files.length) {
    //         for (var i = 0; i < files.length; i++) {
    //           var file = files[i];
    //           getPolicy(file);
    //         }
    //       }
    //
    // };


    $scope.$watch('files', function () {
      console.log($scope.files);
      $scope.uploadFiles($scope.files);
    });
    $scope.imageUploads = [];
            $scope.abort = function(index) {
                $scope.upload[index].abort();
                $scope.upload[index] = null;
            };

            $scope.uploadFiles = function (files) {
                // $http.get('/api/s3Uploads').success(function(response) {
                //   console.log(response);
                // });
                // $scope.files = files;
                $scope.upload = [];
                var loop = function (file, i) {
                    $http.get('/api/s3Uploads/s3Policy?mimeType='+ file.type).success(function(response) {
                        var s3Params = response;
                        console.log(s3Params);
                        $scope.upload[i] = Upload.upload({
                            url: 'https://' + s3Params.AWSBucket + '.s3.amazonaws.com/',
                            method: 'POST',
                            transformRequest: function (fields, headersGetter) {
                                //Headers change here
                                var headers = headersGetter();
                                delete headers['Authorization'];
                                // delete headers['authorization'];
                                console.log(headers);
                                console.log(fields);
                                return fields;
                            },
                            fields: {
                                'key' : 'images/' + Math.round(Math.random()*10000) + '$$' + file.name,                                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                'acl' : 'public-read',                                'success_action_status' : '201',
                                'Policy' : s3Params.s3Policy,
                                'Signature' : s3Params.s3Signature,                                'Content-Type' : file.type
                            },
                            file: file
                        });
                        $scope.upload[i]
                        .then(function(response) {
                            file.progress = parseInt(100);
                            if (response.status === 201) {
                                var data = xml2json.parser(response.data),
                                parsedData;
                                parsedData = {
                                    location: data.postresponse.location,
                                    bucket: data.postresponse.bucket,
                                    key: data.postresponse.key,
                                    etag: data.postresponse.etag
                                };
                                $scope.imageUploads.push(parsedData);
                                console.log($scope.imageUploads);

                            } else {
                                console.log('Upload Failed');
                            }
                        }, null, function(evt) {
                            file.progress =  parseInt(100.0 * evt.loaded / evt.total);
                        });
                    });
                };

                if (files && files.length) {
                  for (var i = 0; i < files.length; i++) {
                      var file = files[i];
                      file.progress = parseInt(0);
                      loop(file, i);
                  }
                };

            };


    $scope.newGrapp = {};
    // var $input = $('#photoCover');

      $scope.newGrapp = function() {
        if($scope.newGrapp === '') {
          return;
        }
        $http.post('/api/newGrapps', {
          authorId: $scope.getCurrentUser()._id,
          userName: $scope.getCurrentUser().name,
          user: $scope.getCurrentUser().username,
          userImg: $scope.getCurrentUser().img,
          grapp: $scope.newGrapp.grapp,
          timestamp: new Date(),
          attachUrl: $scope.imageUploads
          // tagedUser: $scope.newGrapp.tagedUser
        });
        $scope.newGrapp = '';
        // $input.val('');
        // enrutar al wall aqui.
        $location.path('/grappWall');
      };

  });
