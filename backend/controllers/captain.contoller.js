const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const registeruser = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, vehicle } = req.body;

    // Validate vehicle details
    if (
      !vehicle ||
      !vehicle.color ||
      !vehicle.plate ||
      !vehicle.capacity ||
      !vehicle.type
    ) {
      return res
        .status(400)
        .json({ message: "Vehicle details are incomplete" });
    }

    // Check if captain already exists
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new captain
    const captain = await captainModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        type: vehicle.type,
      },
    });

    // Generate token for the user
    const token = captain.generateAuthToken();

    // Return success response
    return res.status(201).json({
      message: "Captain registered successfully",
      captain,
      token,
    });
  } catch (error) {
    console.error("Error in registeruser:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  registeruser,
};
