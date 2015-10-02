;(function() {

	'use strict';

	angular
		.module('Loft.Users', [])
		.config(UsersConfig)
		.controller('UsersCtrl', UsersController)
		.factory('GetUsersList', GetUsersList)
		.factory('UsersFactory', UsersFactory);

		// ngInject
		function UsersController($scope, GetUsersList) {
			GetUsersList.query({}, function(data) {
				$scope.users = data;
				for (var i = 0; i <= $scope.users.length; i++) {
					var rub, penny, firstChr, balance = $scope.users[i].balance.toString();
					firstChr = balance.substr(0, 1);
					balance = balance.replace(firstChr, firstChr+' ');
					rub = balance.split('.')[0];
					penny = balance.split('.')[1].substr(0, 2);
					balance = rub + '.' + penny + ' руб';
					$scope.users[i].balance = balance;
				};
			}, function() {
				console.log('АЛАРМ!');
			});
		};

		// ngInject
		function UsersConfig($routeProvider) {
			$routeProvider
				.when('/users', {
					templateUrl: 'app/users/index.html',
					controller: 'UsersCtrl',
					controllerAs: 'usr'
				});
		};

		// ngInject
		function GetUsersList($resource) {
			return $resource('http://www.json-generator.com/api/json/get/cmytvDsQya');
		}

		function UsersFactory() {

		}

})();