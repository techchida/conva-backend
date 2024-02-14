const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS } = require("../../models/models");
const app = express();

app.get("", async (req, res) => {
  try {
    const options = {
      page: req.query?.page || 1,
      limit: 10,
      sort: {
        $natural: -1,
      },
      collation: {
        locale: "en",
        strength: 2,
      },
      customLabels: {
        docs: "campaigns",
      },
    };

    let result = await CAMPAIGNS.paginate(
      {
        owner: req.user.id,
      },
      options
    );

    return res.send(result);
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to fetch campaign",
    });
  }
});

module.exports = app;
