angular.module('starter.controllers')

.controller('MembersCtrl', ['$scope', '$state', '$http', '$templateCache',
                            function($scope, $state, $http, $templateCache) {
	$scope.user = {
			username : '',
			password : ''
	};
	
	$scope.folders = {};
	
	$scope.error = '';

	$scope.login = function(){

		$scope.user = {
				username : this.username,
				password : this.password
		};

		$http.post($server_path + $login_service,
				{username : $scope.user['username'], password : $scope.user['password']},
				{'Content-Type': 'application/x-www-form-urlencoded'}).
				
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available;
					var returnJOSON =  angular.fromJson(data);
					if(returnJOSON.code == '200'){
			         //  $state.go('app.browse');
					//alert(returnJOSON.password);
						localStorage.setItem('memid', returnJOSON.memid);
						localStorage.setItem('username', returnJOSON.username);
						localStorage.setItem('password', returnJOSON.password);
						//alert(localStorage.getItem('username'));
						window.location = 'home.html';
			           // $state.go('app.folders');
						
					}else{
					}
	
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					
					if(returnJOSON.code == '201'){
						$scope.error = 'Invalid postrecID or password...';
					}else{
						$scope.error = 'We have some technical issues...please try again';
					}
				});

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
						//alert( localStorage.getItem('memid'));
						// called asynchronously if an error occurs
						// or server returns response with an error status.
						$scope.error = 'Invalid postrecID or password...';
					});

		 
		};
		
		$scope.listFolders();

}]);



