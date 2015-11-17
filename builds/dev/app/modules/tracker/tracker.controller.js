;(function(){

	'use strict';

	angular.module('Loft.Tracker')
		.controller('TrackerCtrl', TrackerController)
		.controller('WorkoutCtrl', WorkoutController)
		.controller('ExercisesCtrl', ExercisesController);

		// ngInject
		function TrackerController($scope, Tracker) {
			var that = this;
			that.training = Tracker.getTraining();
			that.training.$loaded(function(_trainingList) {
				that.list = _trainingList;
			});
			that.training.$watch(function(_trainingList) {
				that.list = _trainingList;
			});
		};

		// ngInject
		function WorkoutController($scope, Tracker) {
			$scope.exercisesCount = [0];
			console.log($scope.exercisesCount.length);
			$scope.addExercises = function() {
				var cnt = $scope.exercisesCount.length;
				$scope.exercisesCount.push(cnt);
			}
			$scope.addTraining = function(credentails) {
				Tracker.setTraining(credentails);
			}
		};

		// ngInject
		function ExercisesController($scope, GetExercisesList) {
			var that = this;
			that.exercises = GetExercisesList.getAllExercises();
			that.exercises.$loaded(function(_exercisesList) {
				that.list = _exercisesList;
			});
			that.exercises.$watch(function(_exercisesList) {
				that.list = _exercisesList;
			});
		};

})();