'use strict';

angular.module('grapptitude')
  .controller('NewGrappCtrl', function ($scope, $http, $cookieStore, User, Auth, $location, Upload) {
    $scope.users = User.query();
    $scope.getCurrentUser = Auth.getCurrentUser;

    var token = $cookieStore.get('token');

    $scope.$watch('files', function () {
      // console.log($scope.files);
      $scope.uploadFiles($scope.files);
    });
    $scope.imageUploads = [];
            $scope.abort = function(index) {
                $scope.upload[index].abort();
                $scope.upload[index] = null;
            };

            $scope.uploadFiles = function (files) {
                $scope.upload = [];

                var loop = function (file, i) {
                    $http.get('/api/s3Uploads/s3Policy?mimeType='+ file.type).success(function(response) {
                        var s3Params = response;

                        $cookieStore.remove('token');
                        $scope.upload[i] = Upload.upload({
                            url: 'https://' + s3Params.AWSBucket + '.s3.amazonaws.com/',
                            method: 'POST',
                            // transformRequest: function (data, headersGetter, status) {
                            //     //Headers change here
                            //     var headers = headersGetter();
                            //     delete headers['authorization'];
                            //     delete headers.Authorization;
                            //     // delete headers['accept'];
                            //     console.log(headers);
                            //     // console.log(data);
                            //     var data = headers;
                            //     return data;
                            // },
                            // headers: {
                            //   'Authorization': function(config) {
                            //     return undefined;
                            //   },
                            //   'authorization': undefined
                            // },
                            fields: {
                                'key' : 'images/' + $scope.getCurrentUser().username + '/grappImg/' + Math.round(Math.random()*100000000000),                                'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                'acl' : 'public-read',                                'success_action_status' : '201',
                                'Policy' : s3Params.s3Policy,
                                'Signature' : s3Params.s3Signature,                                'Content-Type' : file.type
                            },
                            file: file
                        })

                        // $scope.upload[i]
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
                }

            };

    $scope.newGrapp = {};
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
        // enrutar al wall aqui.
        $cookieStore.put('token', token);
        $location.path('/grappWall');
      };

  });
