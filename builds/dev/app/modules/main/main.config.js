;(function(){

	'use strict';

	angular.module('loft')
		.config(Config)
		.config(HTTPConfig)
		.constant('FIREBASE_URL', 'https://loft-tracker.firebaseio.com/');

		// ngInject
		function Config($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'app/templates/main/index.html'
				})
		};

		// ngInject
		function HTTPConfig($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.useXDomain = true;
 			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}

})();