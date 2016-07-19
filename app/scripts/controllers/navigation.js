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
    

    // initialise google analytics
    $window.ga('create', 'UA-80818524-1', 'auto');

    $scope.trackActivity = function (){
        // track pageview on state change
        var trackCode = "";
        var entryCode = "organic";
        var splitURL = $location.path().split("/");

        if($location.path().indexOf("register") > -1){
            trackCode = "Lead";

        } else {
            trackCode = "ViewContent";

        }

        if($location.path().indexOf("entry") > -1){
            entryCode = splitURL[splitURL.length-1];
        }
        $window.ga('send', 'pageview', entryCode+'/'+trackCode);
        console.log("google analytics: "+entryCode+'/'+trackCode);
        $window.fbq('track', trackCode);
        console.log("FB analytics: "+trackCode+"");
    };


    // Must use a wrapper object, otherwise "activeItem" won't work
    $scope.states = {};

    // navigation items
    $scope.items = [{
        id: '',
        title: 'Home',
        path: '#/'
    }, {
        id: 'about',
        title: 'About',
        path: '#/about'
    }, {
        id: 'waypoint',
        title: 'Waypoint',
        path: '#/waypoint'
    }, {
        id: 'gallery',
        title: 'Gallery',
        path: '#/gallery'
    }, {
        id: 'register',
        title: 'Register',
        path: '#/register'
    }];

    

    // entrypoint url
    var urlString = $location.path();
    var urlStringSplit = urlString.split('/');

    $scope.entryId = "";
    $scope.entryId = "";

    $scope.homeURL = "";
    $scope.registerURL = "";

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
    
    $scope.registerURL = "#/register"+$scope.entryId;
    




    console.log("MainCtrl");

    /**/
    // declare default activeItem
    $scope.states.activeItem = '';

    // checks which item matches the path
    $scope.changeActiveItem = function(){

        $scope.trackActivity();

        var path = "#"+$location.path();
        var lookup = {};
        for (var i = 0, len = $scope.items.length; i < len; i++) {
            lookup = $scope.items[i];
            if($scope.items[i].path === path){
                $scope.states.activeItem = $scope.items[i].id;
            }
        }
        var _urlString = $location.path();
        var _urlStringSplit = _urlString.split('/');
        if(_urlStringSplit[1] === "register"){
            console.log("hello");
            $scope.hideCTA = true;
        } else {
            $scope.hideCTA = false;
        }


    };

    // changes page from click
    $scope.changePage = function(id){
        $location.path(id);
        $scope.changeActiveItem();
    };

    // caters for back button etc
    $scope.$on("$locationChangeStart", function() { 
        $scope.changeActiveItem();
    });

    //$scope.changeActiveItem();
    console.log("NavigationCtrl");

});