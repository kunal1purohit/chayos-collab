require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
const moment = require('moment-timezone');

app.get('/correct-numbers', (req, res) => {
  const now = moment().tz('Asia/Kolkata'); // Use your desired time zone
  const currentTime = now.valueOf();

  const revealStart = moment().tz('Asia/Kolkata').set({
    hour: 8,
    minute: 20,
    second: 0,
    millisecond: 0,
  });

  const revealEnd = moment().tz('Asia/Kolkata').set({
    hour: 8,
    minute: 25,
    second: 0,
    millisecond: 0,
  });

  if (now.isBetween(revealStart, revealEnd)) {
    const correctNumbers = require('./correctNumbers');
    res.json({ correctNumbers });
  } else {
    res.status(403).json({ message: 'Correct numbers are not available at this time.' });
  }
});

app.post('/generate-number', (req, res) => {
    const number = Math.floor(Math.random() * 100) + 1; // Generates a number between 1 and 100
    res.json({ number });
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
