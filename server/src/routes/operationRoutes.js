const express = require('express');
const router = express.Router();
const { getOperations } = require('../controllers/operationController');
const { validateAirportParam } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

router.get('/operations/:airportId', validateAirportParam, asyncHandler(getOperations));

module.exports = router;

