var app = angular.module('astronomy-demo', []);

app.controller('StarController', function($scope, $http) {

	$http({
      method: 'GET',
      url: "./assets/data/hygxyz-small.csv",
      transformResponse: function(issuelist) {
        // Transform CSV file into a JSON object
        var json = $.csv.toObjects(issuelist);
        return json;
      },
      cache: true,
    })
    .success(function(issuelist, status) {
        $scope.stars = issuelist;
    });
	
	$scope.getStarName = function(star)
   {
      if (star.ProperName.length != 0) {
		return star.ProperName;
	  } else if (star.BayerFlamsteed != 0) {
		return star.BayerFlamsteed;
	  } else if (star.Gliese != 0) {
		return "Gliese " + star.Gliese;
	  } else if (star.HR.length != 0) {
		return "HR " + star.HR;
	  } else if (star.HD.length != 0) {
		return "HD " + star.HD;
	  } else if (star.HIP.length != 0) {
		return "HIP " + star.HIP;
	  } else {
		return "UNKNOWN " + star.StarID;
	  }
   };
	
});