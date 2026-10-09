const { validateAirportId, validateSimulationBody } = require('../utils/validators');
const { getAirportsList } = require('../data/airports');

function validateAirportParam(req, res, next) {
  const { airportId } = req.params;
  const validIds = getAirportsList().map(a => a.id);
  const result = validateAirportId(airportId, validIds);

  if (!result.valid) {
    return res.status(404).json({
      success: false,
      message: result.message,
      errors: [result.message]
    });
  }

  req.cleanAirportId = result.cleanId;
  next();
}

function validateSimulationPayload(req, res, next) {
  const result = validateSimulationBody(req.body);
  if (!result.valid) {
    return res.status(400).json({
      success: false,
      message: 'Invalid simulation parameters',
      errors: result.errors
    });
  }
  next();
}

module.exports = {
  validateAirportParam,
  validateSimulationPayload
};

