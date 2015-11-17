;(function() {

	'use strict';

	angular
		.module('Loft.User', [])
		.config(UserConfig)
		.controller('UserCtrl', UserController);

		function UserController() {
			console.log('UserController');
		}

		// ngInject
		function UserConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('user', {
					url: '/user',
					templateUrl: 'app/user/index.html',
					controller: 'UserCtrl',
					controllerAs: 'uc'
				})
		}

})();