require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./database/db");
const { route } = require("./routes/user.routes");
const router1 = require("./routes/user.routes");
const cookieparser = require("cookie-parser");
const router2 = require("./routes/captain.routes");

app.use(cookieparser());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true, // support parsing of application/x-www-form-urlencoded
  })
);
app.use("/user", router1);
app.use("/captain", router2);
const PORT = process.env.PORT || 5000;

const server = () => {
  dbconnect();
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

server();
