const express = require('express');
const router = express.Router();
const allData = require('../models/All-Data');
const usData = require('../models/US-Data');
const countriesData = require('../models/Countries-Data');
const allHistoricalData = require('../models/All-Historical-Data');
const usHistoricalData = require('../models/US-Historical-Data');
const userData = require('../models/User-Data');

router.get('/all', async (req, res) => {
  try {
    const covidData = await allData.findOne();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/countries', async (req, res) => {
  try {
    const covidData = await countriesData.find({});
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/countries/:country', async (req, res) => {
  var countryCap = '';
  if (req.params.country.length === 3 || req.params.country.length === 2) {
    countryCap = req.params.country.toUpperCase();
  } else {
    countryCap =
      req.params.country.charAt(0).toUpperCase() + req.params.country.slice(1);
  }

  try {
    const covidData = await countriesData.findOne({ country: countryCap });
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/countries/code/:iso', async (req, res) => {
  var countryCode = req.params.iso.toUpperCase();
  try {
    var covidData;
    if (countryCode.length == 2) {
      covidData = await countriesData.findOne({ iso2: countryCode });
    } else {
      covidData = await countriesData.findOne({ iso3: countryCode });
    }
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/states', async (req, res) => {
  try {
    const covidData = await usData.find();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/states/:state', async (req, res) => {
  var stateCap = req.params.state.toLowerCase().split(' ');
  for (var i = 0; i < stateCap.length; i++) {
    stateCap[i] =
      stateCap[i].charAt(0).toUpperCase() + stateCap[i].substring(1);
  }

  try {
    const covidData = await usData.findOne({ state: stateCap.join(' ') });
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/historical/all', async (req, res) => {
  try {
    const covidData = await allHistoricalData.findOne();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/historical/usa', async (req, res) => {
  try {
    const covidData = await usHistoricalData.findOne();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/user', async (req, res) => {
  const data = req.body;

  const userDatas = new userData(data);

  userDatas.save((err) => {
    if (err) {
      res.json({ message: err });
      return;
    }
    return res.json({ message: 'Data Saved!' });
  });
});

router.get('/user', async (req, res) => {
  try {
    const covidData = await userData.find();
    res.json(covidData);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
