const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const env = process.env.NODE_ENV;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/recipes", require("./routes/recipe.routes"));

app.get("/", (req, res) => {
  res.send("Hello World! API is working");
});
const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.jch5d.mongodb.net/${
  env === "development" ? DB_NAME : ""
}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    if (env === "development") {
      console.log(url);
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    }
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

module.exports = app;
