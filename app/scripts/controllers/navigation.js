'use strict';

/**
 * @ngdoc function
 * @name angularBoilerplateApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the angularBoilerplateApp
 */
angular.module('angularBoilerplateApp')
  .controller('NavigationCtrl', function ($scope, $location, $rootScope, $window) {
    
    // entrypoint url
    var urlString = $location.path();
    var urlStringSplit = urlString.split('/');
    
    $scope.homeURL = "";

    if(urlStringSplit[1] || urlStringSplit[2]){
        console.log(1);
        if(urlStringSplit[1] === "entry"){
            console.log(2);
            $scope.entryId = "/entry/"+urlStringSplit[2];
            console.log("bah: "+$scope.entryId);
        } else if(urlStringSplit[2] === "entry") {
            console.log(3);
            $scope.entryId = "/entry/"+urlStringSplit[3];
            console.log("bah: "+$scope.entryId);
        }
    }
    if($scope.entryId === ""){
        $scope.homeURL = "#/";
    } else {
        $scope.homeURL = "#"+$scope.entryId;
    }

    // initialise google analytics
    $window.ga('create', 'UA-80818524-1', 'auto');
    
    $scope.openRegistration = function (){
        $scope.trackActivity('Lead');
        var win = window.open('https://www.surveymonkey.com/r/7Z59VHR', '_blank');
        win.focus();
    };

    $scope.trackActivity = function (trackCode){
        // track pageview on state change
        var entryCode = "organic";
        var splitURL = $location.path().split("/");

        if($location.path().indexOf("entry") > -1){
            entryCode = splitURL[splitURL.length-1];
        }

        $window.ga('send', 'pageview', entryCode+'/'+trackCode);
        console.log("google analytics: "+entryCode+'/'+trackCode);
        $window.fbq('track', trackCode);
        console.log("FB analytics: "+trackCode+"");
    };


    $scope.trackActivity('ViewContent');

    console.log("NavigationCtrl");

});