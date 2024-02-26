const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS, LEADS } = require("../../models/models");
const app = express();

app.get("/:campaignID", async (req, res) => {
  try {
    if (
      (await CAMPAIGNS.exists({
        _id: req.params.campaignID,
        owner: req.user.id,
      })) == null
    )
      return res.status(400).json({
        message: "Failed to resolve campaign authorization",
      });

    const campaign = await CAMPAIGNS.findOne({
      _id: req.params.campaignID,
      owner: req.user.id,
    }).lean();

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
        docs: "leads",
      },
    };

    let result = await LEADS.paginate(
      {
        campaignID: req.params.campaignID,
      },
      options
    );

    let allLeads = await LEADS.find({
      campaignID: req.params.campaignID,
    }).lean();

    let stats = [];

    for (i = 0; i <= 5; i++) {
      stats.push(allLeads.filter((lead) => lead.vote == i).length);
    }

    return res.send({
      ...result,
      method: campaign.type,
      stats,
      title: campaign.campaign,
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to fetch campaign",
    });
  }
});

module.exports = app;
