const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEFAULT_EMISSION_FACTOR: parseFloat(process.env.DEFAULT_EMISSION_FACTOR) || 2.68,
  DEFAULT_ALLOWED_IDLE_MINUTES: parseInt(process.env.DEFAULT_ALLOWED_IDLE_MINUTES, 10) || 15
};

