var app = angular.module('astronomy-demo', []);

app.controller('StarController', function($scope, $http) {

	var lim = 100;
	var off = 0;
	var selectedFilter = "Distance";
	$scope.showFilter = false;
	$scope.filterExtended = false;
	$scope.stars = [];
	var starsBuffered = [];
	var currentSearch;
	
	$scope.switchFilter = function(filter) {
		selectedFilter = filter;
		$scope.initStars();
	}
	
	$scope.initStars = function() {
		off = 0;
		$scope.stars = [];
		starsBuffered = [];
		$scope.loadStars();
		$scope.selectedStar = $scope.stars[0];
		$scope.bufferStars();
	}
	
	$scope.toggleFilterPanel = function(){
		if(!$scope.showFilter) {
			$scope.showFilter = true;
		}
		$scope.filterExtended = !$scope.filterExtended;
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
		$scope.bufferStars();
	}
	
	$scope.searchStars = function(search) {
		off = 0;
		starsBuffered = [];
		currentSearch = $scope.keywords;
		$scope.stars = [];
		console.log($scope.keywords);
		$http.get('/search', {params: {query:currentSearch,limit:lim,offset:off,filter:selectedFilter}}).success(function(stars) {
			$scope.stars.push.apply($scope.stars ,stars);
		});
		off += lim;
	}
	
	$scope.bufferStars = function() {
		if(currentSearch) {
			$http.get('/search', {params: {query:currentSearch,limit:lim,offset:off,filter:selectedFilter}}).success(function(stars) {
				if(stars) {
					starsBuffered.push.apply(starsBuffered ,stars);
				}
			});
		} else {
			$http.get('/stars', {params: {limit:lim,offset:off,filter:selectedFilter}}).success(function(stars) {
				if(stars) {
					starsBuffered.push.apply(starsBuffered ,stars);
				}
			});
		}
		off += lim;
	}
	
	$scope.select= function(item) {
		$scope.selectedStar = item;
    };
	
	$scope.itemClass = function(item) {
        return item === $scope.selectedStar ? 'active' : undefined;
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