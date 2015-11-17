;(function() {

	'use strict';

	angular.module('Loft.Tracker')
		.factory('GetExercisesList', GetExercisesList)
		.factory('Tracker', TrackerFactory);

		// ngInject
		function GetExercisesList(dbc, $firebaseArray) {
			var o = {};
			o.getAllExercises = function() {
				var ref = dbc.getRef();
				return $firebaseArray(ref.child('exercises'));
			}
			return o;
		}

		// ngInject
		function TrackerFactory(dbc, $firebaseArray) {
			var o = {};
			var exercises = $firebaseArray(dbc.getRef().child('training'));
			o.setTraining = function(credentails) {
				credentails.uid = sessionStorage.uid;
				return exercises.$add(credentails);
			}
			o.getTraining = function(uid) {
				return exercises;
			}
			return o;
		}

})();