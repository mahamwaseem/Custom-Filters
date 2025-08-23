const express = require ("express");
const connectDB = require ("./config/db");
const  Record = require("./routes/filters")

const app = express();

connectDB();

app.use =(express.json());

app.use('/record', Record);

module.exports = app;