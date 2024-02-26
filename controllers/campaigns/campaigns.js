const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS, LEADS } = require("../../models/models");
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

    const campaigns = new Array();

    for (i = 0; i < result.campaigns.length; i++) {
      leads = await LEADS.countDocuments({
        campaignID: result.campaigns[i]._id.toString(),
      });
      campaigns[i] = { ...result.campaigns[i]._doc, leads: leads };
    }

    return res.status(200).json({ ...result, campaigns });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to fetch campaign",
    });
  }
});



module.exports = app;
