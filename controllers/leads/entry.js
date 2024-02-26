const express = require("express");
const Joi = require("joi");
const { LEADS, CAMPAIGNS } = require("../../models/models");
const app = express();
const moment = require("moment");

app.post("/", async (req, res) => {
  try {
    let payload = Joi.object({
      name: Joi.string().min(0).max(30),
      email: Joi.string().email({ tlds: { allow: false } }),
      comment: Joi.string().min(0).max(300),
      vote: Joi.string().min(0).max(120),
      option: Joi.string().min(0).max(120),
      campaignID: Joi.string().required().min(12).max(120),
    }).validate(req.body);

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    if ((await CAMPAIGNS.exists({ _id: payload.value.campaignID })) == null)
      return res.status(400).json({
        message: "failed to reconcile lead campaign",
      });

    let newLead = await LEADS.create({ ...payload.value, createdAt: moment() });

    return res.json({
      message: "Lead created succesfully",
      id: newLead._id.toString(),
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(400).json({
      message: "failed to creeate Lead",
    });
  }
});

module.exports = app;
