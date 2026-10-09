const { identifyHotspots } = require('../services/hotspotService');

function getHotspots(req, res) {
  const hotspotAnalysis = identifyHotspots(req.cleanAirportId);
  if (!hotspotAnalysis) {
    return res.status(404).json({
      success: false,
      message: `No carbon hotspot detected for airport: ${req.params.airportId}`,
      errors: ['No excessive idling groups found']
    });
  }

  res.status(200).json({
    success: true,
    data: hotspotAnalysis,
    meta: {
      airportId: req.cleanAirportId,
      isSynthetic: true,
      timestamp: new Date().toISOString()
    },
    message: 'Primary carbon hotspot evaluated successfully'
  });
}

module.exports = {
  getHotspots
};

