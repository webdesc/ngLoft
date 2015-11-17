;(function() {

	'use strict';

	angular
		.module('Loft.Tracker')
		.config(TrackerConfig);

		function TrackerConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('exercises', {
					url: '/exercises/',
					templateUrl: 'app/templates/tracker/views/exercises.html',
					controller: 'ExercisesCtrl',
					controllerAs: 'exr'
				})
				.state('exercise-detail', {
					url: '/exercises/:id',
					templateUrl: 'app/templates/tracker/views/exercise-detail.html',
					controller: 'ExercisesCtrl',
					controllerAs: 'exr'
				})
				.state('workout', {
					url: '/workout/',
					templateUrl: 'app/templates/tracker/views/workout.html',
					controller: 'WorkoutCtrl',
					controllerAs: 'trk'
				})
				.state('training-detail', {
					url: '/workout/training/:id',
					templateUrl: 'app/templates/tracker/views/training-detail.html',
					controller: 'TrainingDetailCtrl',
					controllerAs: 'tdl'
				});
		}

})();