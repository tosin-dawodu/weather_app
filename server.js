/**
 * import http, create an instance
 */
const http = require("http");

/**
 * create an object to act as the app API endpoint
 */
projectData = {};

/**
 * import express package, create an instance
 */

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

/**
 * import cors package,create an instance
 */
const cors = require("cors");
app.use(cors());

/**
 * direct express to the website folder to access html, css and js files
 */
app.use(express.static("website"));

/**
 * create a local server and print in terminal using callback function
 */
const port = 5500;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

/**
 * get request
 */
app.get("/all", function (req, res) {
  res.send(projectData);
});

/**
 * post request
 */
app.post("/all", function (req, res) {
  console.log(req.body);
  projectData = req.body;
  /**
   * return weather details
   */
  res.send("successful");
});


