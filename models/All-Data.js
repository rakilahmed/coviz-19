const mongoose = require('mongoose');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema({
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  recovered: Number,
  todayRecovered: String,
  active: Number,
  critical: Number,
  tests: Number,
  population: Number,
  affectedCountries: Number,
});

module.exports = mongoose.model('covid-all-data', dataSchema);
