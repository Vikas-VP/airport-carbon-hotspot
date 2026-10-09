const { getAirportComparison } = require('../services/comparisonService');

function getComparison(req, res) {
  const comparison = getAirportComparison();
  res.status(200).json({
    success: true,
    data: comparison,
    meta: {
      count: comparison.airports.length,
      isSynthetic: true,
      timestamp: new Date().toISOString()
    },
    message: 'Multi-airport comparison overview generated successfully'
  });
}

module.exports = {
  getComparison
};

