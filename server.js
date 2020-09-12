const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const DATABASE_URL = "mongodb://mongo:27017/users_test";

const movieRoutes = require('./rest-api/movies/routes/movies');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use((error, req, res, next) => {
  console.log(error, "error");
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.use("/movies", movieRoutes);

mongoose
  .connect(DATABASE_URL)
  .then((result) => {
    app.listen(3000, () => console.log("server started on port 3000"));
  })
  .catch((err) => console.log(err, "err"));
