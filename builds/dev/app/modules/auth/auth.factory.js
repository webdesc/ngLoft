;(function() {

	'use strict';

	angular.module('Loft.Auth')
		.factory('Authentication', AuthenticationFactory)
		.factory('Users', UsersFactory);

		// ngInject
		function AuthenticationFactory(dbc, $firebaseAuth) {
			var o = {};
			var auth = $firebaseAuth(dbc.getRef());

			o.authObj = function(credentails) {
				return auth.$authWithPassword(credentails);
			};

			o.getAuth = function() {
				var authData = auth.$getAuth();
				if (authData) {
					console.log("Logged in as:", authData.uid);
				} else {
					console.error("Logged out");
				}
			};

			o.onAuth = function() {
				auth.$onAuth(function(authData) {
					console.log(authData);
					if (authData) {
						delete sessionStorage.currentUser;
						delete sessionStorage.uid;
						auth.$unauth();
					} else {
						console.error("Logged out");
					}
				});
			};

			o.createUser = function(credentails) {
				return auth.$createUser(credentails);
			}

			return o;
		}

		// ngInject
		function UsersFactory(dbc, $firebaseArray, $firebaseObject) {
			var o = {};
			var users = $firebaseArray(dbc.getRef().child('users'));
			o.setUsers = function(uid, credentails) {
			//console.log(users);
				//var usersUID = $firebaseArray(dbc.getRef().child('users').child(uid));
				//var usersUID = $firebaseObject(dbc.getRef().child('users').child(uid));
				/*console.log(usersUID);
				usersUID.$save();*/
				return users.$add({
					'first_name': credentails.first_name,
					'last_name': credentails.last_name,
					'email': credentails.email,
					'phone': credentails.phone,
					'gender': credentails.gender,
					'age': credentails.age,
					'growth': credentails.growth,
					'weight': credentails.weight,
					'birthday': credentails.birthday
				});
			}
			return o;
		}

})();