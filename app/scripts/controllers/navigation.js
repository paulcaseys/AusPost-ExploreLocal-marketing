'use strict';

/**
 * @ngdoc function
 * @name angularBoilerplateApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the angularBoilerplateApp
 */
angular.module('angularBoilerplateApp')
  .controller('NavigationCtrl', function ($scope, $location) {
    
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
    

    /**/
    // declare default activeItem
    $scope.states.activeItem = '';

    // checks which item matches the path
    $scope.changeActiveItem = function(){
        var path = "#"+$location.path();
        var lookup = {};
        for (var i = 0, len = $scope.items.length; i < len; i++) {
            lookup = $scope.items[i];
            if($scope.items[i].path === path){
                $scope.states.activeItem = $scope.items[i].id;
            }
        }

        // register specific
        if(path === "#/register"){
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

    $scope.changeActiveItem();
    console.log("NavigationCtrl");

});