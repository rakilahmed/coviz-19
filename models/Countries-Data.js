const mongoose = require('mongoose');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema({
  country: String,
  iso2: String,
  iso3: String,
  lat: Number,
  long: Number,
  cases: Number,
  todayCases: Number,
  deaths: Number,
  todayDeaths: Number,
  recovered: Number,
  todayRecovered: Number,
  active: Number,
  critical: Number,
  tests: Number,
  population: Number,
  continent: String,
});

module.exports = mongoose.model('covid-countries-data', dataSchema);
