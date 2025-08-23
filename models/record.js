const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  date: {type: Date, required: true},
  value:{type: Number, required: true},
});

module.exports = mongoose.model('Record', recordSchema);