const express = require("express");
const campaignRouter = express.Router();
const authman = require("../../middleware/authman");

campaignRouter.use(authman);
campaignRouter.use("/create", require("./new"));
campaignRouter.use("/update", require("./update"));
campaignRouter.use("/delete", require("./delete"));
campaignRouter.use("/list", require("./campaigns"));
campaignRouter.use("/leads", require("./leads"));
module.exports = campaignRouter;
