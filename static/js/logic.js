//https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
//initial map set-up
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 13
  });
  // map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  // URL to earthquake data
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  // d3 function to extract json 
  d3.json(url, function(response) {
    //print responses
    console.log(response);
    //set up empty array
    var heatArray = [];
    //extract data
    for (var i = 0; i < response.length; i++) {
      var location = response[i].location;
     //get location data
      if (location) {
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
    }
  //print map
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  });
  