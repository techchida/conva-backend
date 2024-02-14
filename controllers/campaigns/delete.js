const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS } = require("../../models/models");
const app = express();

app.delete("/", async (req, res) => {
  try {
    let payload = Joi.object({
      id: Joi.string().required().messages({
        "string.empty": "campaign id is required",
      }),
    }).validate(req.body);

    if (
      (await CAMPAIGNS.exists({
        _id: payload.value.id,
        owner: req.user.id,
      })) == null
    )
      return res
        .status(400)
        .json({ message: "Campaign reconciliation failed" });

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    let deleteCampaign = await CAMPAIGNS.findByIdAndDelete(payload.value.id);

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
