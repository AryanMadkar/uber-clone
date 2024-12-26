const express = require("express");
const { body } = require("express-validator");
const {
  registeruser,
  logincaptain,
  getcaptain,
  logoutcaptain,
} = require("../controllers/captain.contoller");
const { authcaptain } = require("../middleware/auth.middleware");

const captainRouter = express.Router();

captainRouter.post(
  "/registration",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .withMessage(
        "Password must contain at least one letter, one number, and one special character"
      ),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.type")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registeruser
);

captainRouter.post(
  "/login",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .withMessage(
        "Password must contain at least one letter, one number, and one special character"
      ),
  ],
  logincaptain
);

captainRouter.get("/getcaptain", authcaptain, getcaptain);
captainRouter.get("/logout", authcaptain, logoutcaptain);

module.exports = captainRouter;
