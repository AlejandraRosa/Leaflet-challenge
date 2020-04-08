// url
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
// get GeoJSON data
d3.json(earthquakeURL, function(data) {
  geoJson(data.features);
});
//function to extract data
function geoJson(earthquakeJson) {
  // Adding Tile layer for both street map and dark map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
//create empty array to hold earthquake data
var earthquakeArray = new Array();
  // loop through earthquake data to obtain details, coordinates and append to array
  for (var i = 0; i < earthquakeJson.length; i++) {
    coordinates = [earthquakeJson[i].geometry.coordinates[1],earthquakeJson[i].geometry.coordinates[0]]
    properties = earthquakeJson[i].properties;
    // color of circles will depend on earthquake magnitude
    var color = "FFFFFF";
    if (properties.mag < 1.00) {
      color = "#66FF33";
    }
    else if (properties.mag < 2.00) {
      color = "#C2FF33";
    }
    else if (properties.mag < 3.00) {
      color = "#ebce3f";
    }
    else if (properties.mag < 4.00) {
      color = "#DD782A";
    }
    else if (properties.mag < 5.00) {
      color = "#dd4e2a";}
    // Add circles to map
    var chooseColor = L.circle(coordinates, {
      fillOpacity: 0.6,
      color: color,
      fillColor: color,
      radius: (properties.mag * 1000)
    //create pop-up
    }).bindPopup(properties.place + " " + properties.mag);
    // add the cricle to the array
    earthquakeArray.push(chooseColor);
  }
  //layer for the circles
  var earthquakes = L.layerGroup(earthquakeArray);
  // set basemap
  var baseMap = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };
  // overlay layer
  var overlayMap = {
    Earthquakes: earthquakes
  };
  // create map and add layers
  var myMap = L.map("map", {
    center: [39.5, -98.35],
    zoom: 4,
    layers: [streetmap,earthquakes]
  });
  L.control.layers(baseMap,overlayMap, {
    collapsed: false
  }).addTo(myMap);
};