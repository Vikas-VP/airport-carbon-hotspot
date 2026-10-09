const { listAirports, getAirport } = require('../services/airportService');

function getAirports(req, res) {
  const airports = listAirports();
  res.status(200).json({
    success: true,
    data: airports,
    meta: {
      count: airports.length,
      isSynthetic: true
    },
    message: 'Synthetic demonstration airports retrieved successfully'
  });
}

function getAirportDetails(req, res) {
  const airport = getAirport(req.cleanAirportId);
  if (!airport) {
    return res.status(404).json({
      success: false,
      message: `Airport not found: ${req.params.airportId}`,
      errors: ['Airport not registered']
    });
  }

  res.status(200).json({
    success: true,
    data: airport,
    meta: {
      isSynthetic: true
    },
    message: 'Airport details retrieved successfully'
  });
}

module.exports = {
  getAirports,
  getAirportDetails
};

