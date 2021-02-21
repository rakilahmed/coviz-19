const mongoose = require('mongoose');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema({
  cases: {},
  deaths: {},
  recovered: {},
});

module.exports = mongoose.model('covid-us-historical-data', dataSchema);
