const { getAirportsList } = require('../data/airports');
const { getVehiclesByAirport } = require('../data/vehicles');
const { getActivitiesByAirport } = require('../data/activitySeed');
const { summarizeEmissions } = require('./emissionsService');
const { identifyHotspots } = require('./hotspotService');

function getAirportComparison() {
  const airports = getAirportsList();
  const airportSummaries = [];

  for (const airport of airports) {
    const fleet = getVehiclesByAirport(airport.id);
    const activities = getActivitiesByAirport(airport.id);
    const summary = summarizeEmissions(activities);
    const hotspot = identifyHotspots(airport.id);

    const avgIdle = activities.length > 0 ? Number((summary.totalIdleMinutes / activities.length).toFixed(1)) : 0;

    airportSummaries.push({
      id: airport.id,
      name: airport.name,
      code: airport.code,
      location: airport.location,
      coordinatesLabel: airport.coordinatesLabel,
      totalVehicles: fleet.length,
      totalRecords: activities.length,
      totalIdleMinutes: summary.totalIdleMinutes,
      averageIdleDurationMinutes: avgIdle,
      totalCo2Kg: summary.totalCo2Kg,
      avoidableCo2Kg: summary.avoidableCo2Kg,
      percentageAvoidable: summary.percentageAvoidableCo2,
      excessiveEventsCount: summary.counts.excessive,
      thresholdBreachesCount: summary.counts.exceedingThreshold,
      primaryHotspot: hotspot ? {
        id: hotspot.hotspotId,
        location: `${hotspot.banner.terminal} - Gate ${hotspot.banner.gate}`,
        vehicleType: hotspot.banner.vehicleType,
        avoidableCo2Kg: hotspot.evidence.avoidableEmissionsKg,
        severity: hotspot.banner.severity
      } : null,
      modeledProfile: summary.avoidableCo2Kg > 180
        ? 'Higher modeled avoidable emissions profile'
        : summary.avoidableCo2Kg > 120
        ? 'Moderate modeled avoidable emissions profile'
        : 'Lower modeled avoidable emissions profile'
    });
  }

  // Comparison charts data
  const charts = {
    emissionsComparison: airportSummaries.map(a => ({
      name: a.code,
      airportName: a.name,
      totalCo2Kg: a.totalCo2Kg,
      avoidableCo2Kg: a.avoidableCo2Kg
    })),
    avoidableCo2Comparison: airportSummaries.map(a => ({
      name: a.code,
      airportName: a.name,
      avoidableCo2Kg: a.avoidableCo2Kg,
      percentageAvoidable: a.percentageAvoidable
    })),
    averageIdleComparison: airportSummaries.map(a => ({
      name: a.code,
      airportName: a.name,
      averageIdleDuration: a.averageIdleDurationMinutes
    }))
  };

  return {
    airports: airportSummaries,
    charts,
    isSynthetic: true
  };
}

module.exports = {
  getAirportComparison
};

