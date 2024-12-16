const express = require("express");
const router1 = express.Router();
const { body } = require("express-validator");
const {
  loginuser,
  registerUser,
  getuser,
  logoutuser,
} = require("../controllers/user.controller");
const authuser = require("../middleware/auth.middleware");
router1.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("firstname").isLength({ min: 3 }).withMessage("Name is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  registerUser
);
router1.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  loginuser
);
router1.get("/profile", authuser, getuser);
router1.get("/logout", authuser, logoutuser);

module.exports = router1;
