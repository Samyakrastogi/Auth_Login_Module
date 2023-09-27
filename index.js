require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

const app = express();
const dbConnection = require("./connection");

app.use(bodyParser.json());
app.use(cors());
const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Express Server Started at ${port}`));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
