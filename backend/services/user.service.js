const userModel = require("../models/user.model");

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      throw new Error(
        "All fields (firstname, lastname, email, and password) are required"
      );
    }

    // Create user in the database
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
    });

    return user;
  } catch (error) {
    console.error("Error in createUser service:", error.message);
    throw new Error("Failed to create user");
  }
};

module.exports = { createUser };
