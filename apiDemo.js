// NPM crypto-price
const price = require('crypto-price')

// NPM finnhub

const finnhub = require("finnhub");
const request = require("request");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "brvkn6nrh5rd378r3l5g"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

// var covid = [];

///////////////////////////////////////////////////
// This section is for fix header 
///////////////////////////////////////////////////


// STOCK PRICES
finnhubClient.quote("GLD", (error, data) => {
  // CURRENT PRICE
  console.log("GLD = " + data.c);
});

// BITCOIN PRICE
// https://www.npmjs.com/package/crypto-price
price.getCryptoPrice("USD", "BTC").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
    console.log("BIT COIN = " + obj.price)
}).catch(err => {
    console.log(err)
})
 
///////////////////////////////////////////////////
// This section is for the body
///////////////////////////////////////////////////

// STOCK TICKER & COMPANY NAME
request('https://finnhub.io/api/v1/stock/profile2?symbol=AMZN&token=brvkn6nrh5rd378r3l5g', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log("STOCK TICKER = " + body.ticker);
  console.log("COMPANY NAME = " + body.name);
});

// STOCK PRICES
finnhubClient.quote("AMZN", (error, data) => {
  // CURRENT PRICE
  console.log("CURRENT PRICE = " + data.c);
  // HIGH DAY PRICE
  console.log("HIGH = " + data.h);
  // LOW DAY PRICE
  console.log("LOW = " + data.l);
});

// PRICE TARGETS
request('https://finnhub.io/api/v1/stock/price-target?symbol=AMZN&token=brvkn6nrh5rd378r3l5g', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  // TARGET HIGH
  console.log("HIGH TG = " + body.targetHigh);
  // TARGET LOW
  console.log("LOW TG = " + body.targetLow);
  console.log("Mediam TG = " + body.targetMedian);
});

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