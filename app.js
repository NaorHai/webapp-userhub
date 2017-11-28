var app = angular.module('userHub', []);

	app.controller('userHubCtrl', function($scope, $http, $templateCache) {

		 $scope.getAllUsers = function() {
		 	  $http.get('http://localhost:8080/userhub/getAllUsers')
		  	.then(function(res) {
		  		$scope.users =  res.data;
		  	})
		  	.catch(function(err) {
		  		console.log(err);	
		  	})
		 };

		  //initial loading
        $scope.getAllUsers();

	 	 $scope.saveUser = function(user) {
	  		$http.post('http://localhost:8080/userhub/udpateUser', user)
	  		.then(function(res) {
	  		return res.data;
	  		})
	  		.catch(function(err) {
	  			console.log(err);	
	  		})
	  	};

	  	  $scope.deleteUserById = function(user_id, index) {
	  		$http.post('http://localhost:8080/userhub/deleteUserById', parseInt(user_id))
	  		.then(function(res) {
	  			if (res.data === true) {
  					$scope.removeRow(index)		
	  			}
	  		})
	  		.catch(function(err) {
	  			console.log(err);	
	  		})
	  	};

  		  $scope.getUserById = function(user_id) {
	  		$http.post('http://localhost:8080/userhub/getUserById', user_id)
	  		.then(function(res) {
	  		return res.data;
	  		})
	  		.catch(function(err) {
	  			console.log(err);	
	  		})
	  	};

	  	$scope.modifyDate = function(date) {
	  		return (new Date(date)).toLocaleDateString();
	  	};

	  	$scope.removeRow = function(index) {
			$scope.users.splice(index, 1);	
  		};

		$scope.header = 'Create/Update a new user';
	    $scope.submit = function (user) {
	        if (user) {
                if(saveUser(user)) {
                    console.log("user was saved!");
                }
            }
            console.log("user was not saved!");
	    };
	});


	app.directive('modal', function () {
	    return {
	        restrict: 'EA',
	        scope: {
	            title: '=modalTitle',
	            header: '=modalHeader',
	            body: '=modalBody',
	            footer: '=modalFooter',
	            callbackbuttonleft: '&ngClickLeftButton',
	            callbackbuttonright: '&ngClickRightButton',
	            handler: '=lolo'
	        },
	        templateUrl: 'templates/modal.tpl.html',
	        transclude: true,
	        controller: function ($scope) {
	            $scope.handler = 'pop';
	            $scope.getLocalDate = function () {
                    return new Date().toLocaleDateString();
                }
	        },
	    };
	});
