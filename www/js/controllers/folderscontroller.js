angular.module('starter.controllers')

.controller('FoldersCtrl', ['$scope', '$state', '$http', '$ionicModal', '$templateCache', '$ionicPopover',
                            function($scope, $state, $http, $ionicModal, ngProgress, $templateCache, $ionicPopover) {
	
	$scope.folderInfo = {
			foldername :  ''
	};
	$scope.folders = {};
	

	
	$scope.error = '';
	
	 var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';
	

	 
	 $scope.openPopover = function($event) {
		    $scope.popover.show($event);
		  };
		  $scope.closePopover = function() {
		    $scope.popover.hide();
		  };
		  
	 $ionicModal.fromTemplateUrl('templates/addfolder.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });	

	  // Triggered in the add folder modal to close it
	  $scope.closeAddFolder = function() {
	    $scope.modal.hide();
	  };

	  // Open the add folder modal
	  $scope.openAddFolder = function() {
	    $scope.modal.show();
	  };
	
	 $scope.listFolders = function () {

		 $http.post($server_path + $myspace_service,
					{id : localStorage.getItem('memid')},
					{'Content-Type': 'application/x-www-form-urlencoded'}).
					
					success(function(data, status, headers, config) {
						// this callback will be called asynchronously
						// when the response is available;
						var models =  angular.fromJson(data);
						for(var i = 0; i < models.length; i++) {
						    var obj = models[i];   
						    $scope.folders[i] = obj;
						    
						}
		
					}).
					error(function(data, status, headers, config) {
						alert( localStorage.getItem('memid'));
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.error = 'Invalid postrecID or password...';
					});

		 
		};
		
		
		$scope.createFolder = function () {
			
			$scope.folderInfo = {
					foldername :  this.foldername
			};

			 $http.post($server_path + $createfolder_service,
						{memid : localStorage.getItem('memid'), fname :  $scope.folderInfo['foldername']},
						{'Content-Type': 'application/x-www-form-urlencoded'}).
						
						success(function(data, status, headers, config) {
							// this callback will be called asynchronously
							// when the response is available;
							var returnJOSON =  angular.fromJson(data);
							if(returnJOSON.code == '200'){
								window.location = 'home.html';
								
							}else{
								$scope.error = returnJOSON.message;
							}
			
						}).
						error(function(data, status, headers, config) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
							$scope.error = returnJOSON.message;
						});

			 
			};
		
			$scope.listFiles = function (folderid) {

				 //alert(folderid);    

				 
				};
		
		$scope.listFolders();	

}]);



