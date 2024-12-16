const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [3, "First name must be at least 3 characters long"],
  },
  lastname: {
    type: String,
    minlength: [3, "Last name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  socketID: {
    type: String,
  },
});

// Fix: Use a regular function to access `this`
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

// Fix: Define as `statics` for schema-level static methods
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
