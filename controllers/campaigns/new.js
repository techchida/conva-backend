const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS } = require("../../models/models");
const app = express();

app.post("/", async (req, res) => {
  try {
    let payload = Joi.object({
      title: Joi.string().required().min(1).max(50).messages({
        "string.empty": "campaign title is required",
        "string.min": "Campaign title requires at least 3 characters",
      }),
      campaign: Joi.string().required().min(2).max(50).messages({
        "string.empty": "campaign title is required",
        "string.min": "Campaign title requires at least 2 characters",
      }),
      subtitle: Joi.string().min(5).max(50),
      type: Joi.string()
        .required()
        .allow("emote", "rating", "generic", "likert")
        .messages({
          "string.allow": "please select a valid campaign type",
        }),
      name: Joi.boolean().required(),
      email: Joi.boolean().required(),
      comment: Joi.boolean().required(),
    }).validate(req.body);

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    let newCampaign = await CAMPAIGNS.create({
      ...payload.value,
      owner: req.user.id,
    });

    return res.status(200).json({
      message: "Campaign created succesfully",
      id: newCampaign._id.toString(),
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to create campaign",
    });
  }
});

module.exports = app;
