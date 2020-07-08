const finnhub = require("finnhub");
const request = require("request");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "brvkn6nrh5rd378r3l5g"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

// var covid = [];

request(
  "https://finnhub.io/api/v1/covid19/us?token=brvkn6nrh5rd378r3l5g",
  { json: true },
  (err, res, body) => {
    if (err) {
      console.log("covid error");
      return console.log(err);
    }
    console.log(body.length);

    // Add up total deaths for the day
    let deaths = 0;
    for (i = 0; i < body.length; i++) {
      deaths = deaths + body[i].death;
    }

    console.log("total deaths = " + deaths);
    console.log(body[0]);
  }
);

// Get a Quote
finnhubClient.quote("F", (error, data) => {
  console.log(data);
});
