;(function() {

	'use strict';

	angular.module('Loft.Users')
		.factory('GetUsersList', GetUsersListFactory)
		.factory('Profile', ProfileFactory);

		// ngInject
		function GetUsersListFactory(dbc, $firebaseArray) {
			var o = {};
			o.getAllUsers = function() {
				var ref = dbc.getRef();
				return $firebaseArray(ref.child('users'));
			}
			return o;
		}

		// ngInject
		function ProfileFactory(dbc, $firebaseArray) {
			var o = {};
			o.getInfo = function() {
				var ref = dbc.getRef();
				return $firebaseArray(ref.child('users'));
			}
			return o;
		}

})();