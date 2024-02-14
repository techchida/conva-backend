const JWT = require("jsonwebtoken");
const { USERS } = require("../models/models");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).json({
        message: "Authorization  missing!",
      });

    let token = authorization.split(" ")[1];
    const seshID = JWT.verify(token, process.env.JWT_SECRET);

    if (!(await USERS.exists({ sessionID: seshID.i })))
      return res.status(401).json({ message: "Authentication Failed" });

    let person = await USERS.findOne({ sessionID: seshID.i });
    if (moment() > person.session)
      return res.status(401).json({ message: "Token expired" });

    await USERS.updateOne(
      {
        _id: person._id.toString(),
      },
      {
        $set: {
          session: moment().add(24, "hours"),
        },
      }
    );

    req.user = {
      email: person.email,
      id: person._id.toString(),
    };
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Authorization Error. " });
  }
};
