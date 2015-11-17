;(function(){

	'use strict';

	angular.module('Loft.Auth')
		.config(AuthConfig);

		// ngInject
		function AuthConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('registration', {
					url: '/registration',
					templateUrl: 'app/templates/auth/views/registration.html',
					controller: 'AuthCtrl',
					controllerAs: 'auth'
				})
		};

})();