$(document).ready(() => {
  // called the /finntest from api-routes.js
  $.get("/finntest").then(finnresponse => {
    // quote1 is an ID for HTML to use, used currently in index.handlebars
    $("#quote1").text(JSON.stringify(finnresponse.data));
    console.log("Hit finntest get and " + finnresponse.data);
    console.log("Hit finntest get and data.o =" + finnresponse.data.o);
    console.log("Hit finntest get and data.c =" + finnresponse.data.c);
    console.log("Hit finntest get and data.h =" + finnresponse.data.h);
  });

  $("#addStockButton").on("click", () => {
    event.preventDefault();
    const tickerValue = $("#tickerfield")
      .val()
      .trim()
      .toUpperCase();
    console.log(tickerValue);
    const portfolioValue = $("#portfoliofield").val();
    console.log(portfolioValue);
    //   $.get("/api/updateportfolio", {portfolio_name: portfolioValue, stock_2: tickerValue});
    $.get("/api/updateportfolio", function(portfolioValue) {
        console.log("trying to get portfolioValue to show up somewhere " + portfolioValue);

    }).then(() => {
        // res.redirect(307, "/api/login");
        console.log("Done SQLing " + portfolioValue);
      })
    ;
  });
  //   Next step is pass tickerValue and portfolioValue to API so it will return quote info
});
