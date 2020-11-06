const request = require("request");

const weatherapi = (data, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=60176f4456894105a1e130106200511&q=" +
    data.latitude +
    "," +
    data.longitude;

  const options = {
    url: url,
    json: true,
  };

  request(options, (err, Response) => {
    if (err === "Unable to connect to location services!") {
      callback("Please check your Api key or ", undefined);
    } else if (err === "Unable to find location, try another search") {
      callback("Unable to find location, try another search");
    } else {
      callback(undefined, {
        place_name:
          Response.body.location.name + " " + Response.body.location.country,
        temp_c: Response.body.current.temp_c,
        temp_f: Response.body.current.temp_f,
        condition: Response.body.current.condition,
      });
    }
  });
};

module.exports = weatherapi;
