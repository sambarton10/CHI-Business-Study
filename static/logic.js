// Creating map object
var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11
  });
  
  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Store API query variables
  var baseURL = "https://data.cityofchicago.org/resource/uupf-x98q.json?";
  var date = "&$where=date_issued between'2021-01-10T00:00:00' and '2021-01-19T00:00:00'";
  var licenseStatus = "license_status=AAI";
  var limit = "&$limit=100000";
  
  // Assemble API query URL
  var queryURL = baseURL + licenseStatus + date;
  console.log(queryURL);
  // Grab the data with d3
  d3.json(queryURL, function(response) {
    console.log(response);

    var heatArray = [];

    for (var i = 0; i < response.length; i++) {
        var lng = response[i].longitude;
        var lat = response[i].latitude;
        if (lat, lng) {
          heatArray.push([lat, lng]);
        }
      }

  var heat = L.heatLayer(heatArray, {
    radius: 30,
    blur: 35
  }).addTo(myMap);
});