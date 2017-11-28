var app = angular.module('userHub', []);

	app.controller('userHubCtrl', function($scope, $http) {

        $scope.header = 'Create/Update a new user';

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

        $scope.submit = function (user) {
            console.log('processing...');
            console.log(user);
            if($scope.saveUser(JSON.stringify(user))) {
				console.log('user was saved!');
			}
			else {
                console.log('user was not saved!');
            }
        };
	});


	app.directive('modal', function () {
        return {
            restrict: 'E',
            scope: {
                title: '=modalTitle',
                header: '=modalHeader',
                body: '=modalBody',
                footer: '=modalFooter',
                selectedUser: '=selectedUser',
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
                $scope.handler = 'pop';
                $scope.name = '1';
                $scope.email = '12';
                $scope.address = '222';
                $scope.join_date = (new Date()).toLocaleDateString();
            },
			link: function(scope, elm, attrs) {
                	scope.callUpdate = function () {
                        scope.$parent.submit({id: 444, name: scope.name, email: scope.email, address: scope.address, join_date: new Date(scope.join_date).getTime()});
                    }
            }
        };
	});
