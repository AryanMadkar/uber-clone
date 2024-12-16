  const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authuser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await userModel.findOne({ blacklistedTokens: token }); // Adjust schema accordingly
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

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authuser:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = authuser;
