const mongoose = require("mongoose");

const dbconnect = () => {
  mongoose
    .connect("mongodb+srv://Aryan:Aradhya%401234@cluster0.0rv7f.mongodb.net/")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = dbconnect;
