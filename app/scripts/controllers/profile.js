'use strict';

/**
 * @ngdoc function
 * @name registrationApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the registrationApp - add details to profile after initial registration
 */
angular.module('registrationApp')
  .directive('matchPasswordWith', [function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        var name = scope.detailsForm.password1.$name;
        var firstPassword = $("[name=" + name +"]");
        element.add(firstPassword).on('keyup', function () {
          scope.$apply(function () {
            var v = element.val()===firstPassword.val();
            ctrl.$setValidity('passwordsMatch', v);
          });
        });
      }
    };
  }])
  .controller('ProfileCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
    // handle steps
    $scope.currentStep = 0;
    $scope.nextStep = function () {
      $scope.currentStep++;
    };
    $scope.previousStep = function () {
      if ($scope.currentStep > 0) $scope.currentStep--;
    };



    // fake signup
    var fakeToken = '111';
    var getRegistrationDetails = function (token) {
      if ($routeParams.registrationToken === fakeToken) {
        return {
          firstName: "first",
          lastName: "last",
          email: "email@domain.com"
        };
      }
      else {
        return false;
      }
    };
    var user = getRegistrationDetails();

    if (user) {
      $scope.user = user;
    }
    else {
      $location.path('missingProfile');
    }

    $scope.update = function (user) {
      console.log("Sending %o to signup API", user);
    };
  }]);
