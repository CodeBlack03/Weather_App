const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?";
  const options = {
    url: url,
    json: true,
    qs: {
      access_token:
        "pk.eyJ1IjoiY29kZWJsYWNrMDMiLCJhIjoiY2toNHZ1eTRkMDFwcjJzcGJvMWJzaWRkaSJ9.-1L4zJWu-TxyZ43alNJKOw",
    },
  };
  request(options, (err, response) => {
    if (err) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      const [
        longitude,
        latitude,
      ] = response.body.features[0].geometry.coordinates;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
