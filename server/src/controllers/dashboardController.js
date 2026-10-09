const { getDashboardData } = require('../services/dashboardService');

function getDashboard(req, res) {
  const data = getDashboardData(req.cleanAirportId);
  if (!data) {
    return res.status(404).json({
      success: false,
      message: `Dashboard data not found for airport: ${req.params.airportId}`,
      errors: ['No operational data available']
    });
  }

  res.status(200).json({
    success: true,
    data,
    meta: {
      airportId: req.cleanAirportId,
      isSynthetic: true,
      timestamp: new Date().toISOString()
    },
    message: 'Dashboard metrics and charts generated successfully'
  });
}

module.exports = {
  getDashboard
};

