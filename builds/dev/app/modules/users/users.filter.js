;(function() {

	'use strict';

	angular.module('Loft.Users')
		.filter('converterToRub', converterToRubFilter);

		function converterToRubFilter() {
			return function (balance) {
				return String(Math.floor(balance * 100)/100).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') + ' руб.';
			}
		}

})();