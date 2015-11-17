;(function() {

	'use strict';

	angular.module('Loft.Auth')
		.directive('infoMessage', infoMessageDirective);

		// ngInject
		function infoMessageDirective() {
			return {
				templateUrl: 'app/templates/auth/directives/info-message.html',
				controller: 'AuthCtrl'
			};
		}

})();