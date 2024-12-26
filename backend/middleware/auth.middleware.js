const jwt = require("jsonwebtoken");
const BlacklistingToken = require("../models/blacklisttoken.model");
const userModel = require("../models/user.model");
const captainModel = require("../models/captain.model");

// Middleware for user authentication
const authuser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistingToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(403)
        .json({ message: "Unauthorized - token is blacklisted" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Find the user
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach the user to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authuser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware for captain authentication
const authcaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistingToken.findOne({ token });
    if (isBlacklisted) {
      return res
        .status(403)
        .json({ message: "Unauthorized - token is blacklisted" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Find the captain
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    req.captain = captain; // Attach the captain to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authcaptain:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  authuser,
  authcaptain,
};
