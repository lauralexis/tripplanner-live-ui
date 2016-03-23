var currentDay = 0;
var dayIndex = 0;
var allTheDays = {}

function reset() {
	$("#hotel-iti").empty();
	$("#restaurant-iti").empty();
	$("#activities-iti").empty();
	for(var k in markers) {
		markers[k].setMap(null);
	}
}

function searcher(arr, text) {
	for(var i=0;i<arr.length; i++) {
		if(arr[i].name === text) {
			return arr[i].place.location;
		}
	}
}

function remover(arr, text) {
	for(var i=0;i<arr.length; i++) {
		if(arr[i] === text) {
			arr.splice(i, 1);
		}
	}
}

function daysCounter() {
	return ++currentDay;
}


function ItineraryItem() {
	this.hotel = [];
	this.restaurants = [];
	this.activities = [];
}

$( "#hotel" ).on( "click", function() {
	var selectedHotel = $( '#hotel-option option:selected' ).text();
	$( "#hotel-list div" ).append( "<span class='title'>" + selectedHotel + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>" );
  	var latlongHotel = searcher(hotels, selectedHotel);
  	drawLocation(latlongHotel, {icon: '/images/lodging_0star.png'});
  	allTheDays[dayIndex].hotel.push(selectedHotel)
});

$( "#restaurant" ).on( "click", function() {
	var selectedRestaurant = $( '#restaurant-option option:selected' ).text();
	$( "#restaurant-list div" ).append("<span class='title'>" + selectedRestaurant + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>");
  	var latlongRestaurant = searcher(restaurants, selectedRestaurant);
  	drawLocation(latlongRestaurant, {icon: '/images/restaurant.png'});
  	allTheDays[dayIndex].restaurants.push(selectedRestaurant)

});

$( "#activity" ).on( "click", function() {
	var selectedActivity = $( '#activity-option option:selected' ).text();
	$( "#activities-list div" ).append("<span class='title'>" + selectedActivity + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>");
  	var latlongActivities = searcher(activities, selectedActivity);
  	drawLocation(latlongActivities, {icon: '/images/star-3.png'});
  	allTheDays[dayIndex].activities.push(selectedActivity)
});

$("#hotel-iti").on("click", '.btn-danger', function(){
	var index = $(this).attr('id'); 
	var hotelToRemove = $(this).prev().text()
	$(this).prev().remove();
	$(this).remove();
	remover(allTheDays[dayIndex].hotel, hotelToRemove)
	markers[index].setMap(null);
});

$("#restaurant-iti").on("click", '.btn-danger', function(){
	var index = $(this).attr('id'); 
	var restaurantToRemove = $(this).prev().text()
	$(this).prev().remove();
	$(this).remove();
	remover(allTheDays[dayIndex].restaurants, restaurantToRemove)
	markers[index].setMap(null);
});

$("#activities-iti").on("click", '.btn-danger', function(){
	var index = $(this).attr('id'); 
	var activitiesToRemove = $(this).prev().text()
	$(this).prev().remove();
	$(this).remove();
	remover(allTheDays[dayIndex].activities, activitiesToRemove)
	markers[index].setMap(null);
});

$("#plus").on('click',  function(){
	var dayNum = daysCounter();
	dayIndex = dayNum;
	$("#plus").before('<button class="btn btn-circle day-btn">'+ dayNum +'</button>');
	allTheDays[dayNum] = new ItineraryItem;
	reset();
	// add a new day - clear
});

$(".day-buttons").on("click", ".day-btn", function() {
	if($(this).text() !== "+") {
		$(".day-buttons").children().removeClass("current-day");
		$(this).addClass("current-day");

		var thisday = $(this).text();
		$("#paneltitle").text("Day "+ thisday);
		dayIndex = thisday;
		reset();

		//shitty refiller
		for(var k in allTheDays[thisday].hotel) {
			$( "#hotel-list div" ).append( "<span class='title'>" + allTheDays[thisday].hotel[k] + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>" );	
		}
		for(var j in allTheDays[thisday].restaurants) {
			$( "#restaurant-list div" ).append( "<span class='title'>" + allTheDays[thisday].restaurants[j] + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>" );	
		}
		for(var h in allTheDays[thisday].activities) {
			$( "#activities-list div" ).append( "<span class='title'>" + allTheDays[thisday].activities[h] + "</span> <button id='"+currentId+"' class='btn btn-xs btn-danger remove btn-circle'>x</button>" );	
		}

		//add markers back in
		for(var i=0; i<allTheDays[thisday].hotel.length;i++){
			var latlongHotel = searcher(hotels, allTheDays[thisday].hotel[i]);
		  	drawLocation(latlongHotel, {icon: '/images/lodging_0star.png'});
		}

		for(i=0;i<allTheDays[thisday].restaurants.length;i++){
		  	var latlongRestaurant = searcher(restaurants, allTheDays[thisday].restaurants[i]);
		  	drawLocation(latlongRestaurant, {icon: '/images/restaurant.png'});
		}

		for(i=0;i<allTheDays[thisday].activities.length;i++){
		  	var latlongActivities = searcher(activities, allTheDays[thisday].activities[i]);
		  	drawLocation(latlongActivities, {icon: '/images/star-3.png'});
		}
	}


	// switch days - clear and set
	//search through the cirlcue - what number  is on the circle? .text() change [dayIndex] to .text()
});

$("#removalbtn").on("click", function() {
	reset();
	var numberToRemove = $("#paneltitle").text().slice(-1);
	 $(".day-btn:contains("+numberToRemove+")").remove();
	// if($(".day-btn").text() === numberToRemove){
	// 	console.log($(".day-btn").text())
	// }
	
})


// plus button --> var itinerary = new ItineraryItem 
