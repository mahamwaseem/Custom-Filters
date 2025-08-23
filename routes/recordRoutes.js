const express = require('express');
const Record = require('../models/record')
const router = express.Router();

//POST
router.post('/', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    await newRecord.save();
    res.status(201).json({ success: true, data: newRecord });
  }
  catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const { firstName, date, value } = req.query; //for query string parameters (after ? in the URL, http://localhost:3000/search?firstName=Ali&date=2025-08-23&value=100).

    let filter = {};

    if (firstName) {
      filter.firstName = { $regex: new RegExp(firstName, 'i') }; // Matches String field to a pattern
    }

    if (date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  filter.date = { $gte: start, $lte: end };
}

    if (value) {
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