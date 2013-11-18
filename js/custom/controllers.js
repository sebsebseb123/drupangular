var thumbsControllers = angular.module('thumbsControllers', []);

thumbsControllers.controller('chromeCtrl', ['$scope', '$http', '$rootScope',
   function ($scope, $http, $rootScope) {
      /**
       * Menu
       */
      // JSONP to get the current menu items.
      $http.jsonp('drupal/api/menu.jsonp?callback=JSON_CALLBACK').
         success(function(data, status) {
            // Clean data to ensure we've only gotten strings.
            data.forEach(function(item, index){
               item.path = typeof item.path === 'string' ? '#/' + item.path : '/';
            });

            // Add it to scope.
            $scope.menu = data;
         }).
         error(function(data, status) {
            $scope.menu = data || "Request failed";
         });

      $scope.closePlayer = function() {
         $rootScope.mp3Url = null;
      }
   }
]);

thumbsControllers.controller('listCtrl', ['$scope', '$http',
   function ($scope, $http) {
      /**
       * Thumbs
       */
      // JSONP to get the current ratings.
      $http.jsonp('drupal/api/ratings.jsonp?callback=JSON_CALLBACK').
         success(function(data, status) {
            $scope.thumbs = data;
         }).
         error(function(data, status) {
            $scope.thumbs = data || "Request failed";
         });

      // Types of Ratings.
      $scope.typesOfRatings = [
         {rating: 'up'},
         {rating: 'down'}
      ];

      // Enable radio buttons for rating.
      $scope.enableRating = 'disabled';

      // Setup the ajax loading var.
      $scope.ajaxLoading = false;

      // Add a new rating to the list.
      $scope.addNewRating = function (newRating) {
         var nodeData = {
            'title': $scope.newDescription,
            'type': 'rating',
            'field_rating': {'und': {'value': newRating}}
         };

         // Set the loading class.
         $scope.ajaxLoading = false;

         $http({url: 'drupal/api/node.json', method: 'POST', data: nodeData}).
            success(function(data, status) {
               $scope.thumbs.unshift ( {description: $scope.newDescription , rating: newRating});
               // Reset vars.
               $scope.newDescription = '';
               $scope.enableRating = 'disabled';
               // Remove the loading class.
               $scope.ajaxLoading = false;
            }).
            error(function(data, status) {
               debugger;
            });
      }

      // Get a random placeholder msg.
      var messages = [
         "Where's the beef?",
         "Did you like things?",
         "Something the matter?",
         "...message goes here.",
         "This is placeholder text.",
         "We did good?",
         "Hit the checkmark!",
         "Got an issue?",
         "Que es tu problema?",
         "Tell us what loved, or hated."
      ];
      var randIndex = Math.floor(Math.random() * messages.length);
      $scope.placeholder = messages[randIndex];
   }
]);

thumbsControllers.controller('songListCtrl', ['$scope', '$http',
   function ($scope, $http) {
      /**
       * Songs
       */

      // JSONP to get the latest songs.
      $http.jsonp('drupal/api/songs.jsonp?callback=JSON_CALLBACK').
         success(function(data, status) {
            $scope.songIndex = data;
         }).
         error(function(data, status) {
            $scope.songIndex = data || "Request failed";
         });
   }
]);

thumbsControllers.controller('songDetailCtrl', ['$scope', '$http', '$routeParams', '$rootScope',
   function($scope, $http, $routeParams, $rootScope) {
      /**
       * Song Detail
       */

      // Get node ID from args.
      var nodeId = $routeParams.nodeId;
      var songDetail;

      // JSONP to get the song detail.
      $http.jsonp('drupal/api/song.jsonp?callback=JSON_CALLBACK&nid=' + nodeId).
         success(function(data, status) {
            songDetail = data[0];
            $scope.songDetail = songDetail;
         }).
         error(function(data, status) {
            $scope.songDetail = data || "Request failed";
         });

      // Set the mp3 url for the player.
      $scope.setMp3 = function() {
         $rootScope.mp3Url = songDetail.mp3;
         //console.log('click');
      }
   }
]);
