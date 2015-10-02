;(function(){

	'use strict';

	angular
		.module('loft', ['ui.router', 'ngResource', 'Loft.User', 'Loft.Users'])
		.config(HTTPConfig)
		.config(Config);

		// ngInject
		function Config($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('main', {
					url: '/',
					templateUrl: 'app/main/index.html'
				})
		};

		// ngInject
		function HTTPConfig($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.useXDomain = true;
 			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		};

})();
;(function() {

	'use strict';

	angular
		.module('Loft.User', [])
		.config(UserConfig)
		.controller('UserCtrl', UserController);

		function UserController() {
			console.log('UserController');
		}

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
		function UsersConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('users', {
					url: '/users',
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