const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { Console } = require("console");
const { forecast } = require("./logic");

const app = express();

/// define path for express config
const publicPath = path.join(__dirname, "./public");
const hbsPath = path.join(__dirname, "./templates/views");
const partialPath = path.join(__dirname, "./templates/partials");

/// setup handlebars engine and view locations
app.set("view engine", "hbs");
app.set("views", hbsPath);
hbs.registerPartials(partialPath);

/// setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Screen",
    name: "Deepak Narang",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Screen",
    name: "Deepak Narang",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Screen",
    name: "Suhani Narang",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please enter an address to fetch the weather" });
  }

  forecast(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error,
      });
    }

    res.send(data);
  });

  // console.log(data);
});

app.get("/help/*", (req, res) => {
  res.render("errorScreen", {
    error: "Help article not found",
    name: "Deepak Narang",
  });
});

app.get("*", (req, res) => {
  res.render("errorScreen", {
    error: "Page not found",
    name: "Deepak Narang",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
