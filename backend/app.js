const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const tumorCodesRoutes = require("./routes/tumorcodes");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  // .connect(
  //   "mongodb+srv://max:" +
  //     process.env.MONGO_ATLAS_PW +
  //     "@cluster0-ntrwp.mongodb.net/node-angular"
  // )
  .connect(
    "mongodb+srv://pradeepta:EpuATyzjFnzi8oul@cluster0.mwly1.mongodb.net/niramai?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/tumorcodes", tumorCodesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
