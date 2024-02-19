const express = require("express");
const app = express();
const authman = require("../../middleware/authman");
app.use(authman);

app.get("", async (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "something went wrong while fetching user",
    });
  }
});

module.exports = app;
