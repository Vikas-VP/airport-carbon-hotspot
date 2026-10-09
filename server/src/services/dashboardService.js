const { getAirportById } = require('../data/airports');
const { getVehiclesByAirport } = require('../data/vehicles');
const { getActivitiesByAirport } = require('../data/activitySeed');
const { summarizeEmissions } = require('./emissionsService');
const { identifyHotspots } = require('./hotspotService');

function getDashboardData(airportId) {
  const airport = getAirportById(airportId);
  if (!airport) return null;

  const fleet = getVehiclesByAirport(airportId);
  const activities = getActivitiesByAirport(airportId);
  const summary = summarizeEmissions(activities);
  const hotspotAnalysis = identifyHotspots(airportId);

  // 1. Daily Idling Emissions Chart Data (aggregate by date)
  const dailyMap = new Map();
  for (const act of activities) {
    const day = act.timestamp.slice(0, 10);
    if (!dailyMap.has(day)) {
      dailyMap.set(day, { date: day, totalCo2Kg: 0, avoidableCo2Kg: 0, idleMinutes: 0 });
    }
    const cur = dailyMap.get(day);
    cur.totalCo2Kg += act.estimatedCo2Kg;
    cur.avoidableCo2Kg += act.avoidableCo2Kg;
    cur.idleMinutes += act.idleMinutes;
  }
  const dailyEmissions = Array.from(dailyMap.values())
    .map(d => ({
      date: d.date,
      totalCo2Kg: Number(d.totalCo2Kg.toFixed(2)),
      avoidableCo2Kg: Number(d.avoidableCo2Kg.toFixed(2)),
      idleMinutes: d.idleMinutes
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // 2. Emissions by Terminal Chart Data
  const terminalMap = new Map();
  for (const term of airport.terminals) {
    terminalMap.set(term.id, { terminal: term.name, terminalId: term.id, totalCo2Kg: 0, avoidableCo2Kg: 0, records: 0 });
  }
  for (const act of activities) {
    if (!terminalMap.has(act.terminalId)) {
      terminalMap.set(act.terminalId, { terminal: act.terminalId, terminalId: act.terminalId, totalCo2Kg: 0, avoidableCo2Kg: 0, records: 0 });
    }
    const t = terminalMap.get(act.terminalId);
    t.totalCo2Kg += act.estimatedCo2Kg;
    t.avoidableCo2Kg += act.avoidableCo2Kg;
    t.records++;
  }
  const terminalEmissions = Array.from(terminalMap.values()).map(t => ({
    terminal: t.terminal,
    terminalId: t.terminalId,
    totalCo2Kg: Number(t.totalCo2Kg.toFixed(2)),
    avoidableCo2Kg: Number(t.avoidableCo2Kg.toFixed(2)),
    records: t.records
  }));

  // 3. Idle Minutes by Vehicle Type Chart Data
  const vehicleTypeMap = new Map();
  for (const act of activities) {
    if (!vehicleTypeMap.has(act.vehicleType)) {
      vehicleTypeMap.set(act.vehicleType, { vehicleType: act.vehicleType, totalIdleMinutes: 0, avoidableIdleMinutes: 0, co2Kg: 0 });
    }
    const vt = vehicleTypeMap.get(act.vehicleType);
    vt.totalIdleMinutes += act.idleMinutes;
    vt.avoidableIdleMinutes += act.avoidableIdleMinutes;
    vt.co2Kg += act.estimatedCo2Kg;
  }
  const vehicleTypeIdle = Array.from(vehicleTypeMap.values()).map(v => ({
    vehicleType: v.vehicleType,
    totalIdleMinutes: v.totalIdleMinutes,
    avoidableIdleMinutes: v.avoidableIdleMinutes,
    co2Kg: Number(v.co2Kg.toFixed(2))
  })).sort((a, b) => b.totalIdleMinutes - a.totalIdleMinutes);

  // 4. Normal vs Excessive Idling Donut Chart Data
  const idlingClassification = [
    { name: 'Normal (<= 15m)', value: summary.counts.normal, color: '#10B981' },
    { name: 'Review (16 - 25m)', value: summary.counts.review, color: '#F59E0B' },
    { name: 'Excessive (> 25m)', value: summary.counts.excessive, color: '#EF4444' },
    { name: 'Operational Exceptions', value: summary.counts.exceptions, color: '#6366F1' }
  ];

  // Hotspot Summary Card details
  const hotspotCard = hotspotAnalysis ? {
    hotspotId: hotspotAnalysis.hotspotId,
    location: `${hotspotAnalysis.banner.terminal} - Gate ${hotspotAnalysis.banner.gate}`,
    terminal: hotspotAnalysis.banner.terminal,
    gate: hotspotAnalysis.banner.gate,
    vehicleType: hotspotAnalysis.banner.vehicleType,
    whySelected: `Highest avoidable emissions cluster (${hotspotAnalysis.evidence.avoidableEmissionsKg} kg CO2 across ${hotspotAnalysis.evidence.excessiveEventsCount} breaches).`,
    breachFrequency: `${hotspotAnalysis.evidence.breachFrequencyPercent}%`,
    currentCo2Kg: hotspotAnalysis.evidence.currentEmissionsKg,
    avoidableCo2Kg: hotspotAnalysis.evidence.avoidableEmissionsKg,
    severity: hotspotAnalysis.banner.severity,
    targetLink: `/hotspot`
  } : null;

  return {
    airport: {
      id: airport.id,
      name: airport.name,
      code: airport.code,
      location: airport.location,
      terminalsCount: airport.terminals.length,
      scope: 'Airside Ground Support Vehicles (Apron & Ramp)',
      lastAnalyzed: '2026-10-07T23:59:59Z',
      isSynthetic: true
    },
    kpis: {
      totalVehicles: {
        label: 'Active Ground Fleet',
        value: fleet.length,
        unit: 'Vehicles',
        description: 'Monitored diesel ramp & apron service vehicles',
        tooltip: 'Total synthetic ground support fleet registered for this airport.'
      },
      totalIdleMinutes: {
        label: 'Total Idling Time',
        value: summary.totalIdleMinutes,
        unit: 'Minutes',
        description: 'Observed stationary engine-on duration across 7 days',
        tooltip: 'Sum of all stationary engine-on time recorded across the observation window.'
      },
      totalCo2Kg: {
        label: 'Estimated Idling CO2',
        value: summary.totalCo2Kg,
        unit: 'kg CO2',
        description: 'Total modeled stationary combustion emissions',
        tooltip: 'Calculated using diesel consumption rates and standard 2.68 kg CO2/L factor.'
      },
      avoidableIdleMinutes: {
        label: 'Avoidable Idle Time',
        value: summary.avoidableIdleMinutes,
        unit: 'Minutes',
        description: 'Time exceeding the 15-min baseline (excluding exceptions)',
        tooltip: 'Stationary minutes past the 15m threshold. Operational exceptions are zero-rated.'
      },
      avoidableCo2Kg: {
        label: 'Potentially Avoidable CO2',
        value: summary.avoidableCo2Kg,
        unit: 'kg CO2',
        description: `${summary.percentageAvoidableCo2}% of total stationary emissions`,
        tooltip: 'Emissions that could be eliminated through engine-off guidelines.'
      },
      thresholdBreaches: {
        label: 'Threshold Breaches',
        value: summary.counts.exceedingThreshold,
        unit: 'Events',
        description: 'Events with stationary idle > 15 minutes',
        tooltip: 'Number of individual events exceeding standard operational limit.'
      }
    },
    charts: {
      dailyEmissions,
      terminalEmissions,
      vehicleTypeIdle,
      idlingClassification
    },
    hotspotSummary: hotspotCard
  };
}

module.exports = {
  getDashboardData
};

