const express = require('express');
const router = express.Router();
const { getHotspots } = require('../controllers/hotspotController');
const { validateAirportParam } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

router.get('/hotspots/:airportId', validateAirportParam, asyncHandler(getHotspots));

module.exports = router;

