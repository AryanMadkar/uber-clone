const mongoose = require("mongoose");

const blacklistingtoken = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const BlacklistingToken = mongoose.model(
  "BlacklistingToken",
  blacklistingtoken
);

module.exports = BlacklistingToken;
