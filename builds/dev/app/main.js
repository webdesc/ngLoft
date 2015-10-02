;(function(){

	'use strict';

	angular
		.module('loft', ['ngRoute', 'ngResource', 'Loft.User', 'Loft.Users'])
		.config(HTTPConfig)
		.config(Config);

		// ngInject
		function Config($routeProvider) {
			$routeProvider
				.otherwise({ redirectTo: '/' })
		};

		// ngInject
		function HTTPConfig($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.useXDomain = true;
 			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		};

})();