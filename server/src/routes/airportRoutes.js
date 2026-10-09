const express = require('express');
const router = express.Router();
const { getAirports, getAirportDetails } = require('../controllers/airportController');
const { validateAirportParam } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

router.get('/airports', asyncHandler(getAirports));
router.get('/airports/:airportId', validateAirportParam, asyncHandler(getAirportDetails));

module.exports = router;

