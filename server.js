const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");

//get our api
const api = require("./routes/api");

//get express app
const app = express();

//connect to db
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://user:hoangthau627@ds221990.mlab.com:21990/fun-english"
);

//cors
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set our api routes
app.use("*", api);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || "3200";
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
