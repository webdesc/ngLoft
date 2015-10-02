;(function() {

	'use strict';

	angular
		.module('Loft.User', [])
		.config(UserConfig)
		.controller('UserCtrl', UserController);

		function UserController() {
			console.log('UserController');
		}

		function UserConfig($routeProvider) {
			$routeProvider
				.when('/user', {
					templateUrl: 'app/user/index.html',
					controller: 'UserCtrl',
					controllerAs: 'uc'
				})
		}

})();