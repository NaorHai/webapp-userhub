var app = angular.module('userHub', []);

	app.controller('userHubCtrl', function($scope, $http, userService) {

        $scope.header = 'Create/Update a new user';

        $scope.getAllUsers = function() {
		 	  $http.get('http://localhost:8898/userhub/getAllUsers')
		  	.then(function(res) {
		  		$scope.users =  res.data;
                $scope.selectedUser =  $scope.users[0];
            })
		  	.catch(function(err) {
		  		console.log(err);	
		  	})
		 };

		 //initial loading
        $scope.getAllUsers();

	 	 $scope.saveUser = function(user) {
	  		$http.post('http://localhost:8898/userhub/updateUser', user)
	  		.then(function(res) {
	  		return res.data;
	  		})
	  		.catch(function(err) {
	  			console.log(err);
	  		})
	  	};

	  	  $scope.deleteUserById = function(user_id, index) {
	  		$http.post('http://localhost:8898/userhub/deleteUserById', parseInt(user_id))
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
	  		$http.post('http://localhost:8898/userhub/getUserById', user_id)
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

        $scope.submit = function (user) {
            console.log('processing...');
            console.log(JSON.stringify(user));
            if($scope.saveUser(JSON.stringify(user))) {
				console.log('user was saved!');
			}
			else {
                console.log('user was not saved!');
            }
        };
        $scope.saveData = function (index) {
            userService.data = $scope.users[index]
        }
	});


	app.directive('modal', ['userService', function (userService) {
        return {
            restrict: 'E',
            scope: {
                title: '=modalTitle',
                header: '=modalHeader',
                body: '=modalBody',
                footer: '=modalFooter',
                // callbackbuttonleft: '&ngClickLeftButton',
                submit: '&',
                updateFn: '&',
                callbackbuttonright: '&ngClickRightButton',
                handler: '=lolo'
            },
            templateUrl: 'modal.tpl.html',
            replace: true,
            transclude: true,
            controller: function ($scope) {
                    console.log('hi');
                    $scope.handler = 'pop';
                    $scope.name = userService.data.name ||'';
                    $scope.email = userService.data.email || '';
                    $scope.address = userService.data.address || '';
                    $scope.join_date = userService.data.join_date || (new Date()).toLocaleDateString();
            },
			link: function(scope, elm, attrs) {
                	scope.callUpdate = function () {
                        scope.$parent.submit({id: userService.data.id || (Math.floor(Math.random() * 1000000) + 1), name: scope.name, email: scope.email, address: scope.address, join_date: userService.data.join_date || (new Date().getTime())});
                    }
            }
        };
	}]);

    app.factory('userService', function() {
        var data = {

            selectedUser: 0

        };
        return {
            data: data
        }
    });
