const { getActivitiesByAirport } = require('../data/activitySeed');
const { getAirportById } = require('../data/airports');
const { calculateSimulation } = require('../utils/calculations');
const { DEFAULT_EMISSION_FACTOR, DEFAULT_ALLOWED_IDLE_MINUTES } = require('../config/constants');
const { identifyHotspots } = require('./hotspotService');

function runSimulation(airportId, payload = {}) {
  const airport = getAirportById(airportId);
  if (!airport) {
    throw new Error(`Airport not found: ${airportId}`);
  }

  const targetIdleMinutes = Number(payload.targetIdleMinutes ?? DEFAULT_ALLOWED_IDLE_MINUTES);
  const hotspotAnalysis = identifyHotspots(airportId);

  if (!hotspotAnalysis) {
    throw new Error(`Unable to evaluate hotspot for airport: ${airportId}`);
  }

  // Filter records belonging to this primary hotspot
  const allRecords = getActivitiesByAirport(airportId);
  const hotspotTerminal = hotspotAnalysis.banner.terminal;
  const hotspotGate = hotspotAnalysis.banner.gate;
  const hotspotVehicleType = hotspotAnalysis.banner.vehicleType;

  const targetRecords = allRecords.filter(r =>
    r.terminalId === hotspotTerminal &&
    r.gateId === hotspotGate &&
    r.vehicleType === hotspotVehicleType
  );

  const simulationResult = calculateSimulation({
    records: targetRecords,
    targetIdleMinutes,
    emissionFactorKgCo2PerLiter: DEFAULT_EMISSION_FACTOR
  });

  let explanationNote = 'Simulated operational intervention caps non-essential stationary idle duration to target limit while fully preserving operational exceptions.';
  if (simulationResult.savings.co2Kg === 0) {
    explanationNote = 'Target idle threshold is greater than or equal to current observed idling durations, resulting in zero modeled operational savings.';
  }

  return {
    hotspotId: hotspotAnalysis.hotspotId,
    airportId: airport.id,
    airportName: airport.name,
    targetLocation: `${hotspotTerminal} - Gate ${hotspotGate}`,
    targetVehicleType: hotspotVehicleType,
    before: simulationResult.before,
    after: simulationResult.after,
    savings: simulationResult.savings,
    affectedEventsCount: simulationResult.affectedEventsCount,
    totalHotspotRecords: simulationResult.totalRecords,
    explanationNote,
    assumptions: {
      targetIdleMinutes,
      defaultBaselineMinutes: DEFAULT_ALLOWED_IDLE_MINUTES,
      fuelEmissionFactorKgCo2PerLiter: DEFAULT_EMISSION_FACTOR,
      fuelType: 'Diesel Ground Support Fuel',
      calculationMethod: 'Deterministic activity-level threshold cap',
      exceptionsHandling: 'Zero-rated: strictly preserved without reduction',
      isSynthetic: true
    }
  };
}

module.exports = {
  runSimulation
};

