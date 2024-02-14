const express = require("express");
const Joi = require("joi");
const { CAMPAIGNS } = require("../../models/models");
const app = express();

app.put("/", async (req, res) => {
  try {
    let payload = Joi.object({
      id: Joi.string().required().messages({
        "string.empty": "campaign id is required",
      }),
      title: Joi.string().required().min(3).max(50).messages({
        "string.empty": "campaign title is required",
        "string.min": "Campaign title requires at least 3 characters",
      }),
      subtitle: Joi.string().min(10).max(50),
      type: Joi.string()
        .required()
        .allow("emote", "rating", "generic", "likert")
        .messages({
          "string.allow": "please select a valid campaign type",
        }),
      name: Joi.boolean(),
      email: Joi.boolean(),
      comment: Joi.boolean(),
    }).validate(req.body);

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    if (
      (await CAMPAIGNS.exists({
        _id: payload.value.id,
        owner: req.user.id,
      })) == null
    )
      return res
        .status(400)
        .json({ message: "Campaign reconciliation failed" });

    let updateCampaign = await CAMPAIGNS.findByIdAndUpdate(payload.value.id, {
      $set: {
        ...payload.value,
      },
    });

    return res.json({
      message: "Campaign preferences updated succesfully",
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to update campaign preferences",
    });
  }
});

module.exports = app;
