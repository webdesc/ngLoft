;(function() {

	'use strict';

	angular.module('Loft.Tracker')
		.directive('addExercisesForTraining', addExercisesForTrainingDirective);

		// ngInject
		function addExercisesForTrainingDirective() {
			return {
				templateUrl: 'app/templates/tracker/directives/add-exercises-for-training.html',
				controller: 'WorkoutCtrl'
			};
		}

})();