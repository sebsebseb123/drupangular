var thumbsApp = angular.module('thumbsApp', [
  'ngRoute',
  'ngSanitize',
  'thumbsControllers'
]);

thumbsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
      }).
      when('/thumbs', {
        templateUrl: 'partials/thumbs.html',
        controller: 'listCtrl'
      }).
      when('/songs', {
        templateUrl: 'partials/song-list.html',
        controller: 'songListCtrl'
      }).
      when('/songs/:nodeId', {
        templateUrl: 'partials/song-detail.html',
        controller: 'songDetailCtrl'
      });
  }]);
