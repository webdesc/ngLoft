;(function() {

	'use strict';

	angular.module('Loft.Users')
		.controller('UsersCtrl', UsersController)
		.controller('ProfileCtrl', ProfileController);

		// ngInject
		function UsersController($scope, GetUsersList, $filter) {
			var that = this;
			that.users = GetUsersList.getAllUsers();
			that.users.$loaded(function(_usersList) {
				that.list = _usersList;
			});
			that.users.$watch(function(_usersList) {
				that.list = _usersList;
			});
		}

		// ngInject
		function ProfileController($scope, Profile) {
			var that = this;
			that.user = Profile.getInfo();
			that.user.$loaded(function(_userInfo) {
				that.info = _userInfo.$getRecord("-K35XIE2h8XFxz8rPjs1");
				console.log(that.info);
			});
			/*that.info = that.user.$getRecord("-K35XIE2h8XFxz8rPjs1");
			console.log(that.info);*/
		}

})();