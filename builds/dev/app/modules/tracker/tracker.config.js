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
				.state('workout', {
					url: '/workout/',
					templateUrl: 'app/templates/tracker/views/workout.html',
					controller: 'WorkoutCtrl',
					controllerAs: 'trk'
				});
		}

})();