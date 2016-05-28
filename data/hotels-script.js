// Define JSON File
 var fs = require("fs");
// Get content from file
 var contents = fs.readFileSync("./hotels-servicemap.json");
// Define to JSON type
 var jsonContent = JSON.parse(contents);
// Get Value from JSON
var results = [];
jsonContent.results.forEach(function(hotel){
  // console.log("name: " + hotel.name.fi);
  // console.log("address: " + hotel.street_address.fi + ",  " + hotel.address_zip);
  // console.log("description: " + hotel.description.en);
  // console.log("coordinates: " + hotel.location.coordinates);

  var hotelJson = {
    name:  hotel.name.fi,
    address: hotel.street_address.fi + ",  " + hotel.address_zip,
    coords: {lat: hotel.location.coordinates[0], lon: hotel.location.coordinates[1]},
    description: hotel.description.en,
    price: 0
  }

  results.push(hotelJson)
});

var outputFilename = './hotels.json';

fs.writeFile(outputFilename, JSON.stringify(results, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
