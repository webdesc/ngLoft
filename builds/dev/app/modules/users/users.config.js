;(function() {

	'use strict';

	angular
		.module('Loft.Users')
		.config(UsersConfig);

		// ngInject
		function UsersConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('users', {
					url: '/users',
					templateUrl: 'app/users/index.html',
					controller: 'UsersCtrl',
					controllerAs: 'usr'
				});
		}

})();