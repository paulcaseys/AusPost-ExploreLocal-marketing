'use strict';

/**
 * @ngdoc function
 * @name angularBoilerplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularBoilerplateApp
 */
angular.module('angularBoilerplateApp')
  .controller('MainCtrl', function ($scope, $location, $rootScope, $window) {
    
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

    // declares that the transition in should begin
    $scope.transitionIn = true;



    ///////////////////////////////////
    // waypoint detection
    // 
    
    // declares self
    var self = this;
    self.yOffset = 50;
    self.waypointAddTransitionInClass = "waypointTransitionIn";
    self.waypointElements = document.getElementsByClassName('waypoint-trigger');

    self.isTouchDevice = function() {
      try {  
        document.createEvent("TouchEvent");  
        return true;  
      } catch (e) {  
        return false;  
      }  
    };

    // declares if the browser is a touch device
    self.isTouchDeviceOn = self.isTouchDevice();

    // declares brwoser height
    self.browserHeight = 0;
    if( typeof( window.innerWidth ) === 'number' ) {
      //Non-IE
      self.browserHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      self.browserHeight = document.documentElement.clientHeight;
    }

    self.detectWaypoint = function() {
      self.wi = 0;
      for (self.wi = 0; self.wi < self.waypointElements.length; self.wi++) { 
        self.curElement = self.waypointElements[self.wi];
        self.curElement.topDetector = self.getElementOffset(self.curElement).top;
        if(self.curElement.topDetector-self.browserHeight+self.yOffset < 0 && !self.curElement.initiated || self.isTouchDeviceOn && !self.curElement.initiated){
          self.curElement.initiated = true;
          self.curElement.className = self.curElement.className + " " + self.waypointAddTransitionInClass;
          console.log("waypoint", self.curElement);
        }
      }
    };

    // gets how far the element is from the top of the browser
    self.getElementOffset = function(el) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    };

    // upon scrolls
    window.onscroll = function () {  
      self.detectWaypoint();
    };
    // initial call when ready
    angular.element(document).ready(function () {
      self.detectWaypoint();
    });

    // removing onscroll event when the view is removed
    $scope.$on("$destroy",function() {
      window.onscroll = null;
    });

    
  });