;(function() {

	'use strict';

	angular
		.module('loft', [
			'Loft.Fire',
			'Loft.Auth',
			'ui.router',
			'ui.bootstrap',
			'ngResource',
			'Loft.Users',
			'Loft.Tracker',
			'datePicker',
			'ngAnimate',
		]);

	angular.module('Loft.Fire', ['firebase']);

	angular.module('Loft.Auth', ['Loft.Fire', 'ui.router', 'datePicker', 'ngAnimate']);

	angular.module('Loft.Users', []);

	angular.module('Loft.Tracker', []);

})();