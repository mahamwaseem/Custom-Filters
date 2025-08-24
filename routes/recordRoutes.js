const express = require('express');
const Record = require('../models/record')
const router = express.Router();

//POST
router.post('/', async (req, res) => {
  try {
    const { firstName, date, value } = req.body;

    if (!firstName || typeof firstName !== "string") {
      return res.status(400).json({ success: false, message: "Invalid or missing firstName" });
    }

    if (!date || isNaN(new Date(date), getTime())) {
      return res.status(400).json({ success: false, message: "Invalid or missing Date" });
    }

    if (value === undefined || isNaN(Number(value))) {
      return res.status(400).json({ success: false, message: "Invalid or missing value" });
    }

    const newRecord = new Record({ firstName, date, value });
    await newRecord.save();
    res.status(201).json({ success: true, data: newRecord });
  }
  catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }

});

//GET
router.get("/", async (req, res) => {
  try {
    const { firstName, date, value } = req.query; //for query string parameters (after ? in the URL, http://localhost:3000/search?firstName=Ali&date=2025-08-23&value=100).

    let filter = {};

    if (firstName) {
      if (typeof firstName !== "string") {
        return res.status(400).json({ success: false, message: "Invalid firstName format" });
      }
      filter.firstName = { $regex: new RegExp(firstName, 'i') }; // Matches String field to a pattern
    }

    if (date) {
      const parsedDate = new Date(date);
      if(isNaN(parsedDate.getTime())){
        return res.status(400). json({ success: false, message:"Invalid date format"});
      }
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = { $gte: start, $lte: end };
    }

    if (value) {
      if(isNaN(Number(value))){
        return res.status(400).json({success: false, message: "Invalid value format"});
      }
      filter.value = Number(value);
    }

    const results = await Record.find(filter);

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  }

  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



module.exports = router;