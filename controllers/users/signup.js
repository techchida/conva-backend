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
        .email({ tlds: { allow: false } })
        .message("Please use a valid email address"),
      password: Joi.string()
        .pattern(
          new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{6,30}$/)
        )
        .message(
          "Password requires  a minimum of 6 characters, at least one uppercase and one digit"
        ),
    }).validate(req.body);

    if (payload.error)
      return res.status(400).json({
        message: payload.error.details[0].message,
      });

    payload = payload.value;

    // check if  email has been used
    if (await USERS.exists({ email: payload.email }))
      return res.status(400).json({
        message: "oops! this email is already in use please sign in",
      });

    //hash the password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(payload.password, salt);
    let id = crypto.randomUUID();
    let expiry = moment().add(24, "hours");

    const token = JWT.sign(
      {
        i: id,
      },
      process.env.JWT_SECRET
    );

    //create record
    await USERS.create({
      email: payload.email,
      password: hash,
      sessionID: id,
      session: expiry,
    });

    return res.json({
      token,
      message: "account created successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      message: "Something went wrong while creating an account",
    });
  }
});

module.exports = app;
