;(function() {

	'use strict';

	angular
		.module('loft', [
			'Loft.Fire',
			'Loft.Auth',
			'ui.router',
			'ui.bootstrap',
			'ngResource',
			'Loft.Users',
			'Loft.Tracker',
			'datePicker',
			'ngAnimate',
		]);

	angular.module('Loft.Fire', ['firebase']);

	angular.module('Loft.Auth', ['Loft.Fire', 'ui.router', 'datePicker', 'ngAnimate']);

	angular.module('Loft.Users', []);

	angular.module('Loft.Tracker', []);

})();
;(function(){

	'use strict';

	angular.module('loft')
		.config(Config)
		.config(HTTPConfig)
		.constant('FIREBASE_URL', 'https://loft-tracker.firebaseio.com/');

		// ngInject
		function Config($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise("/");
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'app/templates/main/index.html'
				})
		}
		Config.$inject = ["$stateProvider", "$urlRouterProvider"];;

		// ngInject
		function HTTPConfig($httpProvider) {
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
			$httpProvider.defaults.useXDomain = true;
 			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}
		HTTPConfig.$inject = ["$httpProvider"];

})();
;(function(){

	'use strict';

	angular.module('loft')
		.controller('AppCtrl', AppController)
		.controller('ModalCtrl', ModalController)
		.controller('ModalInstanceCtrl', ModalInstanceController)
		.controller('DropdownCtrl', DropdownController);

		// ngInject
		function AppController($scope) {
			if (sessionStorage.currentUser) {
				$scope.currentUser = sessionStorage.currentUser;
			}
		}
		AppController.$inject = ["$scope"];;

		// ngInject
		function ModalController($scope, $modal, $log) {
		  $scope.items = ['item1', 'item2', 'item3'];
		  $scope.animationsEnabled = true;
		  $scope.open = function (temp, size) {
		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: temp,
		      controller: 'ModalInstanceCtrl',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };
		  $scope.toggleAnimation = function () {
		    $scope.animationsEnabled = !$scope.animationsEnabled;
		  };
		}
		ModalController.$inject = ["$scope", "$modal", "$log"];

		// ngInject
		function ModalInstanceController($scope, $modalInstance, items) {
		  $scope.items = items;
		  $scope.selected = {
		    item: $scope.items[0]
		  };
		  $scope.ok = function () {
		    $modalInstance.close($scope.selected.item);
		  };
		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		}
		ModalInstanceController.$inject = ["$scope", "$modalInstance", "items"];

		// ngInject
		function DropdownController($scope) {
		  $scope.status = {
		    isopen: false
		  };
		  $scope.toggleDropdown = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.status.isopen = !$scope.status.isopen;
		  };
		}
		DropdownController.$inject = ["$scope"];;

})();
;(function(){

	'use strict';

	angular.module('Loft.Auth')
		.config(AuthConfig);

		// ngInject
		function AuthConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('registration', {
					url: '/registration',
					templateUrl: 'app/templates/auth/views/registration.html',
					controller: 'AuthCtrl',
					controllerAs: 'auth'
				})
		}
		AuthConfig.$inject = ["$stateProvider", "$urlRouterProvider"];;

})();
;(function() {

	'use strict';

	angular.module('Loft.Auth')
		.controller('AuthCtrl', AuthController);

		// ngInject
		function AuthController($scope, Authentication, Users) {
			
			Authentication.getAuth();
			$scope.errorText = 'error';
			$scope.showRegForm = true;
			$scope.login = function(credentails) {
				console.log(Authentication.authObj(credentails));
				Authentication.authObj(credentails).then(function(authData) {
					sessionStorage.currentUser = authData.password.email;
					sessionStorage.uid = authData.uid;
				 	window.location.reload();
				  $scope.errorLogin = true;
				}).catch(function(error) {
				  console.error("Authentication failed:", error);
				  $scope.errorLogin = false;
				});
			};
			$scope.logout = function() {
				Authentication.onAuth();
				window.location.reload();
			};
			$scope.registration = function(credentails) {
				/*var birthdayInput = document.getElementById('birthday').getAttribute('value');
				birthdayInput = new Date(birthdayInput.split('"').join(''));
				document.getElementById('birthday').setAttribute('value', birthdayInput);*/
				credentails.birthday = String(credentails.birthday);
				//console.log(credentails);
				Authentication.createUser(credentails).then(function(regData) {
					var uid = regData.uid;
					$scope.showRegForm = false;
					$scope.messageText = 'Вы успешно зарегистрировались!';
					console.log(credentails);
					Users.setUsers(uid, credentails);
				}).catch(function(error) {
					$scope.showRegForm = true;
					$scope.messageText = ''+error+'';
				});
			};
		}
		AuthController.$inject = ["$scope", "Authentication", "Users"];

})();
;(function() {

	'use strict';

	angular.module('Loft.Auth')
		.directive('infoMessage', infoMessageDirective);

		// ngInject
		function infoMessageDirective() {
			return {
				templateUrl: 'app/templates/auth/directives/info-message.html',
				controller: 'AuthCtrl'
			};
		}

})();
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
		AuthenticationFactory.$inject = ["dbc", "$firebaseAuth"];

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
		UsersFactory.$inject = ["dbc", "$firebaseArray", "$firebaseObject"];

})();
;(function() {

	'use strict';

	angular
		.module('Loft.Fire')
		.factory('dbc', dbcFactory);

		// ngInject
		function dbcFactory(FIREBASE_URL, $firebaseAuth) {
			var o = {};
			var reference = new Firebase(FIREBASE_URL);

			o.getRef = function() {
				return reference;
			}

			return o;
		}
		dbcFactory.$inject = ["FIREBASE_URL", "$firebaseAuth"];

})();
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
		TrackerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

})();
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
		}
		TrackerController.$inject = ["$scope", "Tracker"];;

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
		}
		TrainingDetailController.$inject = ["$scope", "Tracker", "$stateParams"];;

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
		}
		WorkoutController.$inject = ["$scope", "Tracker"];;

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
		}
		ExercisesController.$inject = ["$scope", "GetExercisesList"];;

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
		}
		ExerciseDetailController.$inject = ["$scope", "GetExercisesList"];;

})();
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
		GetExercisesList.$inject = ["dbc", "$firebaseArray"];

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
		TrackerFactory.$inject = ["dbc", "$firebaseArray"];

})();
;(function() {

	'use strict';

	angular
		.module('Loft.Users')
		.config(UsersConfig);

		// ngInject
		function UsersConfig($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('users', {
					url: '/users',
					templateUrl: 'app/users/index.html',
					controller: 'UsersCtrl',
					controllerAs: 'usr'
				});
		}
		UsersConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

})();
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
		UsersController.$inject = ["$scope", "GetUsersList", "$filter"];

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
		ProfileController.$inject = ["$scope", "Profile"];

})();
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
		GetUsersListFactory.$inject = ["dbc", "$firebaseArray"];

		// ngInject
		function ProfileFactory(dbc, $firebaseArray) {
			var o = {};
			o.getInfo = function() {
				var ref = dbc.getRef();
				return $firebaseArray(ref.child('users'));
			}
			return o;
		}
		ProfileFactory.$inject = ["dbc", "$firebaseArray"];

})();
;(function() {

	'use strict';

	angular.module('Loft.Users')
		.filter('converterToRub', converterToRubFilter);

		function converterToRubFilter() {
			return function (balance) {
				return String(Math.floor(balance * 100)/100).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') + ' руб.';
			}
		}

})();