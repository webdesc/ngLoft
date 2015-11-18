;(function(){

	'use strict';

	angular.module('Loft.Tracker')
		.controller('TrackerCtrl', TrackerController)
		.controller('TrainingDetailCtrl', TrainingDetailController)
		.controller('WorkoutCtrl', WorkoutController)
		.controller('ExercisesCtrl', ExercisesController)
		.controller('ExerciseDetailCtrl', ExerciseDetailController);

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
			that.removeTraining = function(item) {
				that.list.$remove(item);
			};
		};

		// ngInject
		function TrainingDetailController($scope, Tracker, $stateParams) {
			var that = this;
			that.training = Tracker.getTraining();
			that.training.$loaded(function(_trainingList) {
				that.training_detail = _trainingList.$getRecord($stateParams.id);
			});
			that.training.$watch(function(_trainingList) {
				that.training_detail = _trainingList;
			});
		};

		// ngInject
		function WorkoutController($scope, Tracker) {
			$scope.exercisesCount = [0];
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

		// ngInject
		function ExerciseDetailController($scope, GetExercisesList) {
			var that = this;
			that.exercises = GetExercisesList.getAllExercises();
			that.exercises.$loaded(function(_exercisesList) {
				that.exercise_detail = _exercisesList.$getRecord($scope.exercise.exercisesID);
			});
			that.exercises.$watch(function(_exercisesList) {
				that.exercise_detail = _exercisesList;
			});
		};

})();