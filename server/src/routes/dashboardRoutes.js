const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { validateAirportParam } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

router.get('/dashboard/:airportId', validateAirportParam, asyncHandler(getDashboard));

module.exports = router;

