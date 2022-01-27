const request = require("postman-request");

exports.forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=b5086a35cea7a9c8b4baef6ebc93d8be&query=${address}`;

  request(url, (error, response, body) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (JSON.parse(body).error) {
      callback("Unable to find location");
    } else {
      const data = JSON.parse(body).current;

      callback(undefined, data);
    }
  });
};
