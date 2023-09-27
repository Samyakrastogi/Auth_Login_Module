const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const dbConnection = require("./connection");

app.use(bodyParser.json());
app.use(cors());

app.listen(4000, () => console.log("Express Server Started at Port 4000"));
