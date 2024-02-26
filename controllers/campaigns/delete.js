const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS } = require("../../models/models");
const app = express();

app.delete("/:campaignID", async (req, res) => {
  console.log(req.body);
  try {
    if (
      (await CAMPAIGNS.exists({
        _id: req.params.campaignID,
        owner: req.user.id,
      })) == null
    )
      return res
        .status(400)
        .json({ message: "Campaign reconciliation failed" });

    let deleteCampaign = await CAMPAIGNS.findByIdAndDelete(
      req.params.campaignID
    );

    return res.json({
      message: "Campaign deleted succesfully",
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to delete campaign ",
    });
  }
});

module.exports = app;
