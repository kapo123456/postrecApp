angular
		.module('starter.controllers')

		.controller(
				'FilesCtrl',
				[
						'$scope',
						'$state',
						'$http',
						'$ionicModal',
						'$stateParams',
						'$upload',
						'fileUpload',
						'$templateCache',
						function($scope, $state, $http, $ionicModal,
								$stateParams, $upload, fileUpload, $modal,
								$templateCache) {

							$scope.format = 'M/d/yy h:mm:ss a';

							$scope.fileInfo = {
								foldername : ''
							};

							$scope.files = {};

							$scope.locations = {};

							$scope.folder_id = '';

							$scope.folder_name = '';

							$scope.file_id = '';

							$scope.file_name = '';

							$scope.download_link = '';

							$scope.latlng = '';

							$scope.download = '';

							$scope.share_location = '';

							$scope.error = '';
							
							$scope.message = '';
							
							$scope.successmessage = '';
							
							$scope.errormessage = '';
							
							$scope.progress = '';

							$scope.downlaodpath = '';
							
							$ionicModal.fromTemplateUrl(
									'templates/uploadfile.html', {
										scope : $scope,
									}).then(function(uoloadModel) {
								$scope.uoloadModel = uoloadModel;
							});

							$ionicModal.fromTemplateUrl(
									'templates/sharefile.html', {
										scope : $scope
									}).then(function(shareModel) {
								$scope.shareModel = shareModel;
							});

							// Triggered in the add folder modal to close it
							$scope.closeUploadFile = function() {
								$scope.uoloadModel.hide();
							};

							// Open the add folder modal
							$scope.openUploadFile = function() {
								$scope.uoloadModel.show();
							};

							// Triggered in the share file modal to close it
							$scope.closeShareFile = function() {
								$scope.file_id = '';
								$scope.folder_id = '';
								$scope.download_link = '';
								$scope.sender_id = '';

								$scope.shareModel.hide();
							};

							// Open the share file modal
							$scope.openShareFile = function(folderid, fileid,
									filename) {

								$scope.file_id = fileid;
								$scope.folder_id = folderid;
								$scope.download_link = $server_path
										+ $filedownload_service + 'id='
										+ folderid + '&filename=' + filename;
								$scope.sender_id = localStorage
										.getItem('memid');
								$scope.shareModel.show();

							};

							$scope.listFiles = function() {
								$scope.downlaodpath = $server_download_path;
								$http
										.post(
												$server_path
														+ $listfiles_service,
												{
													downloadid : $stateParams.downloadid
												},
												{
													'Content-Type' : 'application/x-www-form-urlencoded'
												})
										.

										success(
												function(data, status, headers,
														config) {

													$scope.folder_name = $stateParams.downloadname;

													// this callback will be
													// called asynchronously
													// when the response is
													// available;
													var models = angular
															.fromJson(data);

													for (var i = 0; i < models.length; i++) {
														var obj = models[i];
														$scope.files[i] = obj;

													}

												})
										.error(
												function(data, status, headers,
														config) {

													// alert(
													// localStorage.getItem('memid'));
													// called asynchronously if
													// an error occurs
													// or server returns
													// response with an error
													// status.
													$scope.error = 'No files found...';
												});

								// Get user locations
								$http
										.post(
												$server_path
														+ $userlocations_service,
												{
													memid : localStorage
															.getItem('memid')
												},
												{
													'Content-Type' : 'application/x-www-form-urlencoded'
												})
										.success(
												function(data, status, headers,
														config) {
													var models = angular
															.fromJson(data);

													for (var i = 0; i < models.length; i++) {
														var obj = models[i];
														$scope.locations[i] = obj;
													}
												})
										.error(
												function(data, status, headers,
														config) {
													$scope.error = 'No locations found...';
												});

							};
							
							$scope.formatDate = function(enteredDate){
								var d = new Date(enteredDate);
								var curr_date = d.getDate()<10 ? '0'+ d.getDate() : d.getDate();
								var curr_month = d.getMonth()<10 ? '0'+ d.getMonth() : d.getMonth();
								curr_month++;
								var curr_year = d.getFullYear();
								return (curr_month<10 ? '0' + curr_month : curr_month) + "/" + curr_date + "/" + curr_year;
							}

							// Share file using email

							$scope.shareFile = function() {
								if(!(this.startdate - this.enddate > 0)){
									$scope.error = '';
									$http
									.post(
											$server_path
													+ $sharefile_service,
											{
												fileid : $scope.file_id,
												shareaddress : this.shareaddress,
												message : (this.message  != '')? this.message: '',
												daterange : this.formatDate(this.startdate)
														+ ' - '
														+ this.formatDate(this.enddate),
												latlng : (this.latlng != '')? this.latlng: '',
												radius : (this.radius != null)? this.radius: 2000,
												download : this.download,
												downloadlink : $scope.download_link,
												downloadid : $scope.folder_id,
												senderid : localStorage
														.getItem('memid')
											},
											{
												'Content-Type' : 'application/x-www-form-urlencoded'
											})
									.

									success(
											function(data, status, headers,
													config) {
												var returnJOSON = angular
														.fromJson(data);
												$scope.successmessage = 'File shared successfully';
												this.shareaddress = '';
												this.message ='';
												this.startdate = '';
												this.enddate = '';
												$scope.closeShareFile();

											})
									.error(
											function(data, status, headers,
													config) {
												var returnJOSON = angular
														.fromJson(data);
												// called asynchronously if
												// an error occurs
												// or server returns
												// response with an error
												// status.
												$scope.errormessage = 'Failed to share file...try again';
											});
								}else{
									$scope.error = 'Start date must be before end date.';
								}
								
							};

							// Get user locations
							$http
									.post(
											$server_path
													+ $userlocations_service,
											{
												memid : localStorage
														.getItem('memid')
											},
											{
												'Content-Type' : 'application/x-www-form-urlencoded'
											})
									.success(
											function(data, status, headers,
													config) {
												var models = angular
														.fromJson(data);

												for (var i = 0; i < models.length; i++) {
													var obj = models[i];
													$scope.locations[i] = obj;
												}
											})
									.error(
											function(data, status, headers,
													config) {
												$scope.error = 'No locations found...';
											});

							$scope.onFileSelect = function($files) {
								// $files: an array of files selected, each file
								// has name, size,
								// and type.
								for (var i = 0; i < $files.length; i++) {

									var file = $files[i];
									$scope.upload = $upload
											.upload(
													{
														url : $server_path + $uploadfile_service
																+ $stateParams.downloadid, // upload.php
														// script,
														// node.js
														// route,
														// or
														// servlet
														// url
														data : {
															myObj : $scope.myModelObj
														},
														file : file,
														headers : {
															'Content-Type' : undefined
														},
														transformRequest : angular.identity,
													})
											.progress(
													function(evt) {
														console
																.log('percent: '
																		+ parseInt(100.0
																				* evt.loaded
																				/ evt.total));
														$scope.progress = "File Uploading: "
																+ parseInt(100.0
																		* evt.loaded
																		/ evt.total)
																+ "%";
													})
											.success(
													function(data, status,
															headers, config) {
														// file is uploaded
														// successfully
														console.log(data);
														$scope
																.closeUploadFile();
														window.location
																.reload();
													})
											.error(
													function(data, status,
															headers, config) {
														// file is uploaded
														// successfully
														alert("fdfdf");
													});
								}
							};

							$scope.uploadFile = function() {
								//alert("");
								var file = $scope.myFile;
								console.log('file is ' + JSON.stringify(file));
								var uploadUrl = $server_path + $uploadfile_service
										+ $stateParams.downloadid;
								fileUpload.uploadFileToUrl(file, uploadUrl);
							};
							
							$scope.openremotefile = function(fileurl) {
								cordova.plugins.disusered.open(fileurl);
							};
							
							$scope.downloadFile = function(uriString){
								var fileTransfer = new FileTransfer();
								var uri = encodeURI(uriString);

								fileTransfer.download(
								    uri,
								    fileURL,
								    function(entry) {
								        console.log("download complete: " + entry.fullPath);
								    },
								    function(error) {
								        console.log("download error source " + error.source);
								        console.log("download error target " + error.target);
								        console.log("upload error code" + error.code);
								    },
								    false,
								    {
								        headers: {
								            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
								        }
								    }
								);
							};

							$scope.listFiles();

						} ]);
