alert('Hello, World!')

$.get( "app/hygxyz.csv", function( data ) {
  var stars = $.csv.toObjects(data)
  stars.forEach(function(entry) {
    
	});
  
});
alert('Done!')