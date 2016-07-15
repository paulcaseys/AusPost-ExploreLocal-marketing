'use strict';

/**
 * @ngdoc function
 * @name angularBoilerplateApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the angularBoilerplateApp
 */
angular.module('angularBoilerplateApp')
  .controller('RegisterCtrl', function ($scope, $location, $rootScope, $window) {
    
    // initialise google analytics
    $window.ga('create', 'UA-80818524-1', 'auto');
    // track pageview on state change
    $window.ga('send', 'pageview', $location.path());
    console.log("google analytics: "+$location.path());

    
    // logs controller
    console.log("RegisterCtrl");


    // body copy example
    $scope.bodyCopy = "hello world";

    // declares that the transition in should begin
    $scope.transitionIn = true;
    
    // entrypoint url
    var urlString = $location.path();
    var urlStringSplit = urlString.split('/');

    $scope.entryId = "";

    if(urlStringSplit[1] || urlStringSplit[2]){
        console.log(1);
        if(urlStringSplit[1] === "entry"){
            console.log(2);
            $scope.entryId = "entry/"+urlStringSplit[2];
            console.log($scope.entryId);
        } else if(urlStringSplit[2] === "entry") {
            console.log(3);
            $scope.entryId = "entry/"+urlStringSplit[3];
            console.log($scope.entryId);
        }
    }
    

  });
