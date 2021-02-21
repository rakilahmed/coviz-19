// REQUIRED DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// App + PORT + Database URL
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.MONGODB_URI || process.env.DB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const covidRoutes = require('./routes/data-routes');
app.use('/api', covidRoutes);

if (process.env.STATIC === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build'))
  });
}

// Connect to MongoDB -- Local Database
mongoose.connect(
  CONNECTION_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('DB connection successful!')
);

// Listen to the server
app.listen(PORT, () => console.log(`Listening...http://localhost:${PORT}`));
