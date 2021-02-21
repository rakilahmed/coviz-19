const mongoose = require('mongoose');

// Specifying the format of the JSON data
const dataSchema = mongoose.Schema(
  {
    date: String,
    time: String,
    name: String,
    location: String,
    body: String,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model('covid-user-data', dataSchema);
