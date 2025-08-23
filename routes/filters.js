const express = require('express');
const Record = require('../models/record')
const router = express.Router();

router.get("/", async (req, res) => {
  try{
    const{ firstName, date, value } = req.query; //for query string parameters (after ? in the URL, http://localhost:3000/search?firstName=Ali&date=2025-08-23&value=100).

    let filter = {};

    if(firstName){
      filter.firstName = {$regex: new RegExp(firstName, 'i')}; // Matches String field to a pattern
    }

    if(date) {
      filter.date = new Date(date);
    }

    if(value) {
      filter.value = Number(value);
    }

    const results = await Record.find(filter);

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  }

  catch(err){
    res.status(500).json({success: false, message: err.message});
  }
});

module.exports = router;