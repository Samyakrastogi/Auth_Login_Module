require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const routes = require('./auth.routes');

const app = express();
const dbConnection = require("./connection");



app.use(bodyParser.json());
app.use(cors());
const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Express Server Started at ${port}`));
app.use('/', routes);
