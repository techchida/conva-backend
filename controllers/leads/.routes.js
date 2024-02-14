const express = require("express");
const leadsRouter = express.Router();

leadsRouter.use("/new", require("./entry"));
module.exports = leadsRouter;
