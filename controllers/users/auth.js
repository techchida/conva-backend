const express = require("express");
const app = express();
const Joi = require("joi");
const { USERS } = require("../../models/models");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const JWT = require("jsonwebtoken");
const moment = require("moment");

app.post("/", async (req, res) => {
  try {
    let payload = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .message("Please use a valid email address"),
      password: Joi.string().required(),
    }).validate(req.body);

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    payload = payload.value;

    if (await !USERS.exists({ email: payload.email }))
      return res.status(400).json({ message: "invalid credentials provided" });

    const person = await USERS.findOne({ email: payload.email });
    //   compare passwords
    if (!bcrypt.compareSync(payload.password, person.password))
      return res.status(400).json({ message: "invalid credentials provided" });

    let id = crypto.randomUUID();
    let expiry = moment().add("24", "hours");

    await USERS.updateOne(
      { email: person.email },
      {
        $set: {
          session: expiry,
          sessionID: id,
        },
      }
    );

    let token = JWT.sign(
      {
        i: id,
      },
      process.env.JWT_SECRET
    );

    return res.json({
      token,
      message: "sign in successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Something went wrong while authentication",
    });
  }
});

module.exports = app;
