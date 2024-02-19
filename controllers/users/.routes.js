const express = require("express");
const userRouter = express.Router();
userRouter.use("/signup", require("./signup"));
userRouter.use("/auth", require("./auth"));
userRouter.use("/profile", require("./profile"));
module.exports = userRouter;
