const mongoose = require('mongoose');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema({
  state: String,
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  active: Number,
  tests: Number,
  population: Number,
});

module.exports = mongoose.model('covid-us-data', dataSchema);
