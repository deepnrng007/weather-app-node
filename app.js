const data = require("./logic");

const address = process.argv[2];

address
  ? data.forecast(address, (error, data) => {
      console.log(error);
      console.log(data);
    })
  : console.log("Please provide an address");
