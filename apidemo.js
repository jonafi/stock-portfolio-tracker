// To run demo locally
// > npm i finnhub
// > node apidemo.js

const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "brvkn6nrh5rd378r3l5g"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

finnhubClient.quote("F", (error, data, response) => {
  console.log(data);
});
