var app = angular.module('astronomy-demo', []);

app.controller('StarController', function($scope, $http) {

	var lim = 250;
	var off = 0;
	var selectedFilter = "Distance";
	$scope.stars = [];
	var starsBuffered = [];
	
	$scope.switchFilter = function(filter) {
		selectedFilter = filter;
		$scope.initStars();
	}
	
	$scope.initStars = function() {
		off = 0;
		$scope.stars = [];
		$scope.loadStars();
		$scope.selectedStar = $scope.stars[0];
		$scope.bufferStars(5);
	}
	
	$scope.loadStars = function() {
		$http.get('/stars', {params: {limit:lim,offset:off,filter:selectedFilter}}).success(function(stars) {
			$scope.stars.push.apply($scope.stars ,stars);
		});
		off += lim;
	}
	
	$scope.requestStarBatch = function() {
		for (var i = 0; i < lim; i++) {
			$scope.stars.push(starsBuffered.shift());
		}
		$scope.bufferStars(1);
	}
	
	$scope.bufferStars = function(batches) {
		for(var i = 0; i < batches; i++) {
			$http.get('/stars', {params: {limit:lim,offset:off,filter:selectedFilter}}).success(function(stars) {
				starsBuffered.push.apply(starsBuffered ,stars);
			});
			off += lim;
		}
	}
	
	$scope.select= function(item) {
		$scope.selectedStar = item;
    };
	
	$scope.itemClass = function(item) {
        return item === $scope.selectedStar ? 'active' : undefined;
    };
	
	$scope.getStarName = function(star) {
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
   
   $scope.initStars();
}).directive('ngScroll', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.ngScroll);
            }
        });
    };
});