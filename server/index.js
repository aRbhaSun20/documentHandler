const express = require("express");
require("dotenv").config();

const { Authentication } = require("./middlewares/Authentication");

const app = express();

const cors = require("cors");

// connect to mongo database
const mongoose = require("mongoose");
const loginRouter = require("./routes/login");
const { requirementRouter } = require("./routes/Requirements");

mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to db");
  })
  .catch((e) => console.log(e));

// enable cors policy
app.use(cors());

// enable to receive express json request
app.use(express.json());

// login routes
app.use(loginRouter);

// Authentication middleware to check tokens
app.use(Authentication);

// Requirement routes
app.use(requirementRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
