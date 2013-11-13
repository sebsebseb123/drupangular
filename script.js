function thumbsController($scope, $http) {
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

   // Add a new rating to the list.
   $scope.addNewRating = function (newRating) {
      var nodeData = {
         'title': $scope.newDescription,
         'type': 'rating',
         'field_rating': {'und': {'value': newRating}}
      };

      $http({url: 'drupal/api/node.json', method: 'POST', data: nodeData}).
         success(function(data, status) {
            $scope.thumbs.unshift ( {description: $scope.newDescription , rating: newRating});
            // Reset vars.
            $scope.newDescription = '';
            $scope.enableRating = 'disabled';
         }).
         error(function(data, status) {
            debugger;
         });
   }
}
