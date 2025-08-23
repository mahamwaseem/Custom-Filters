const express = require ("express");
const connectDB = require ("./config/db");
const  recordRoutes = require("./routes/recordRoutes")

const app = express();
connectDB();

app.use (express.json());

app.use('/records', recordRoutes);

module.exports = app;