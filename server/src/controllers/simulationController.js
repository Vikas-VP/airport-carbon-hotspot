const { runSimulation } = require('../services/simulationService');

function postSimulation(req, res) {
  const result = runSimulation(req.cleanAirportId, req.body);
  res.status(200).json({
    success: true,
    data: result,
    meta: {
      airportId: req.cleanAirportId,
      isSynthetic: true,
      timestamp: new Date().toISOString()
    },
    message: 'Simulation calculated successfully'
  });
}

module.exports = {
  postSimulation
};

