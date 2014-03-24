alert('Hello, World!')

$.get( "hygxyz.csv", function( data ) {
  var stars = $.csv.toObjects(data)
  stars.forEach(function(entry) {
    
	});
  
});
alert('Done!')