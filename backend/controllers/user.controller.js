const { validationResult } = require("express-validator");
const userServices = require("../services/user.service");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const BlacklistingToken = require("../models/blacklisttoken.model");
const registerUser = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;

    // Fix: Hash the password using the updated static method
    const hashedPassword = await userModel.hashPassword(password);

    // Fix: Pass full name properly
    const user = await userServices.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Generate token for the user
    const token = user.generateAuthToken();

    // Return success response
    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginuser = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    // Fix: Check if user exists and password matches
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Fix: Hash the password using the updated static method
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token for the user
    const token = user.generateAuthToken();
    res.cookie("token", token);

    // Return success response
    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getuser = async (req, res) => {
  try {
    // User is populated by authuser middleware
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getuser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutuser = async (req, res) => {
  try {
    // Clear token cookie
    const token = req.cookie?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    await BlacklistingToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logoutUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  logoutuser,
  getuser,
  registerUser,
  loginuser,
};
