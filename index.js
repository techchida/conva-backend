const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = 4000;
const corsConfig = require("./configs/cors");

app.use(cors(corsConfig));
app.use(express.json());

const router = require("./router/router");
app.use("/", router);

// if route does not exist redirect to 404 page
app.use((req, res, next) => {
  return res.status(404).json({
    message: "this resource does not exist or has been moved",
  });
});

// if error occurs redirect to 500 page
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    message: "oops! Something went terribly wrong - :) ",
  });
});

app.listen(port, () => {
  console.log(
    "server started and listening on port: " + port + " at " + new Date()
  );
});
