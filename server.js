const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
require('dotenv').config()

// Define middleware here
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/user", require('./routes/users'))

//Mongoose

mongoose.connect("mongodb://localhost/project3")

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
