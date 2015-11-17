;(function() {

	'use strict';

	angular.module('Loft.Auth')
		.controller('AuthCtrl', AuthController);

		// ngInject
		function AuthController($scope, Authentication, Users) {
			
			Authentication.getAuth();
			$scope.errorText = 'error';
			$scope.showRegForm = true;
			$scope.login = function(credentails) {
				console.log(Authentication.authObj(credentails));
				Authentication.authObj(credentails).then(function(authData) {
					sessionStorage.currentUser = authData.password.email;
					sessionStorage.uid = authData.uid;
				 	window.location.reload();
				  $scope.errorLogin = true;
				}).catch(function(error) {
				  console.error("Authentication failed:", error);
				  $scope.errorLogin = false;
				});
			};
			$scope.logout = function() {
				Authentication.onAuth();
				window.location.reload();
			};
			$scope.registration = function(credentails) {
				/*var birthdayInput = document.getElementById('birthday').getAttribute('value');
				birthdayInput = new Date(birthdayInput.split('"').join(''));
				document.getElementById('birthday').setAttribute('value', birthdayInput);*/
				credentails.birthday = String(credentails.birthday);
				//console.log(credentails);
				Authentication.createUser(credentails).then(function(regData) {
					var uid = regData.uid;
					$scope.showRegForm = false;
					$scope.messageText = 'Вы успешно зарегистрировались!';
					console.log(credentails);
					Users.setUsers(uid, credentails);
				}).catch(function(error) {
					$scope.showRegForm = true;
					$scope.messageText = ''+error+'';
				});
			};
		}

})();