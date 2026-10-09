const express = require('express');
const router = express.Router();
const { postSimulation } = require('../controllers/simulationController');
const { validateAirportParam, validateSimulationPayload } = require('../middleware/validateRequest');
const asyncHandler = require('../utils/asyncHandler');

router.post('/simulations/:airportId', validateAirportParam, validateSimulationPayload, asyncHandler(postSimulation));

module.exports = router;

