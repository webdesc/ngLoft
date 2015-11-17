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
		};

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
		};

})();