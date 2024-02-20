const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  dbName: `conva`,
});

const USERS = mongoose.model(
  "users",
  new mongoose.Schema({
    fullname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    session: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    username: {
      type: String,
    },
    address: {
      type: String,
    },
    birthdate: {
      type: String,
    },
    sessionID: {
      type: String,
    },
    gender: {
      type: String,
    },
    avatar: {
      type: String,
    },
    google: {
      type: Boolean,
    },
    emailVerified: {
      type: Boolean,
    },
    suspended: {
      type: Boolean,
    },
    createdAt: {
      type: String,
    },
    modifiedAt: {
      type: String,
    },
  })
);

const CAMPAIGNS = mongoose.model(
  "campaigns",
  new mongoose.Schema({
    campaign: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    type: {
      type: String,
    },
    name: {
      type: Boolean,
    },
    email: {
      type: Boolean,
    },
    comment: {
      type: Boolean,
    },
    createdAt: {
      type: String,
    },
    modifiedAt: {
      type: String,
    },
    owner: {
      type: String,
      required: true,
    },
  }).plugin(paginate)
);

const LEADS = mongoose.model(
  "leads",
  new mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    vote: {
      type: String,
    },
    comment: {
      type: String,
    },
    option: {
      type: String,
    },
    createdAt: {
      type: String,
      required: true,
    },
    campaignID: {
      type: String,
      required: true,
    },
  }).plugin(paginate)
);

module.exports = {
  USERS,
  CAMPAIGNS,
  LEADS,
};
