// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { Op } = require("sequelize");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name
      });
    }
  });

  // Route for getting stock data
  app.get("/api/display_portfolio", (req, res) => {
    db.Portfolio.findAll({
      where: {
        stock_1: { [Op.ne]: null } //works with "vz" as well
      }
    }).then(res => {
      const output = {
        stocklist: res
      };
      // console.log(res[1].dataValues.portfolio_name);
      console.log(output);
      console.log("LOGGING" + output.stocklist[1].stock_1);
      console.log("LOGGING" + JSON.stringify(output.stocklist[1].dataValues));
      const neededstocklist = JSON.stringify(output.stocklist[1].dataValues);
      console.log("neededstocklist is " + neededstocklist);
      const splitneededstocklist = neededstocklist.split(", ");
      // console.log("LOGGING" + JSON.stringify(output.stocklist[1].dataValues));
    });
  });

  //   app.get("/api/get_saved_stocks", (req, res) => {
  //     db.Portfolio.findAll({
  //       where: {
  //         stock_1: { [Op.ne]: null }
  //       }.then(res => {
  //       const output = {
  //         stocklist: res
  //       };

  //       app.get("/finntest", (req, res) =>
  //   finnhubClient.quote("AMZN", (error, data) => {
  //     res.json({
  //       data
  //     });
  //   })
  // );
  //     })
  //   })

  // router.get("/", function (req, res) {
  //   burger.selectAll(function (data) {
  //     let output = {
  //       burger: data
  //     };
  //     res.render("index", output);
  //   });
  // });
  // Used following data
  // https://sequelize.org/master/manual/model-querying-basics.html
  // https://stackoverflow.com/questions/59016613/sequelize-find-all-where-currentusereditor-is-not-null

  app.get("/api/updateportfolio", (req, res) => {
    const inputportfolio_name = req.portfolioValue;
    console.log("inputportfolio_name is currently " + inputportfolio_name);
    console.log("Our input is " + JSON.stringify(req.body));
    console.log("Our input is " + req);
    db.Portfolio.update(
      { stock_2: "AAAA" },
      { where: { portfolio_name: "Energy" } }
    )
      .then(() => {
        console.log("Done SQLing ");
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/api/createportfolio", (req, res) => {
    db.Portfolio.create({
      portfolio_name: "energy",
      stock_1: "bb",
      stock_2: "zq"
    })
      .then(() => {
        // res.redirect(307, "/api/login");
        res.redirect("/members");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  app.get("/displaytest", (req, res) =>
    db.Portfolio.findAll().then(portfolio => {
    console.log(portfolio[0]);
    // res.sendStatus(200);
    const output = { portfolio };
    res.render("index", output);
  })
  );

  const finnhub = require("finnhub");
  const api_key = finnhub.ApiClient.instance.authentications.api_key;
  api_key.apiKey = "brvkn6nrh5rd378r3l5g";
  const finnhubClient = new finnhub.DefaultApi();

  app.get("/finntest", (req, res) =>
    finnhubClient.quote(req.body.ticker, (error, data) => {
    res.json({
      data
    });
  })
  );

  // app.get("/davisfinntest1", (req, res) =>
  //   finnhubClient.quote("ZZZZ", (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.json({
  //       data
  //     });
  //   })
  // );

  // app.get("/davisfinntest2", (req, res) =>
  //   finnhubClient.quote("zzzz", (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.json({
  //       data
  //     });
  //   })
  // );

  // app.get("/davisfinntest3", (req, res) =>
  //   finnhubClient.quote("amzn", (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.json({
  //       data
  //     });
  //   })
  // );
};
