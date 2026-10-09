const { getActivitiesByAirport } = require('../data/activitySeed');
const { getAirportById } = require('../data/airports');
const { calculateActivityEmissions, determineSeverity } = require('../utils/calculations');
const { PRIMARY_RECOMMENDATION, DEFAULT_ALLOWED_IDLE_MINUTES, DEFAULT_EMISSION_FACTOR } = require('../config/constants');

function identifyHotspots(airportId) {
  const airport = getAirportById(airportId);
  if (!airport) return null;

  const records = getActivitiesByAirport(airportId);
  if (!records.length) return null;

  // Group records by terminal, gate, vehicleType
  const groupsMap = new Map();

  for (const r of records) {
    const key = `${r.terminalId}__${r.gateId}__${r.vehicleType}`;
    if (!groupsMap.has(key)) {
      groupsMap.set(key, {
        key,
        airportId: airport.id,
        airportName: airport.name,
        airportCode: airport.code,
        terminalId: r.terminalId,
        gateId: r.gateId,
        vehicleType: r.vehicleType,
        records: []
      });
    }
    groupsMap.get(key).records.push(r);
  }

  // Calculate metrics for each group
  const analyzedGroups = [];

  for (const group of groupsMap.values()) {
    let totalIdleMinutes = 0;
    let avoidableIdleMinutes = 0;
    let totalCo2Kg = 0;
    let avoidableCo2Kg = 0;
    let excessiveCount = 0;
    let maxIdle = 0;

    for (const rec of group.records) {
      const metrics = calculateActivityEmissions(rec);
      totalIdleMinutes += metrics.idleMinutes;
      avoidableIdleMinutes += metrics.avoidableIdleMinutes;
      totalCo2Kg += metrics.estimatedCo2Kg;
      avoidableCo2Kg += metrics.avoidableCo2Kg;

      if (metrics.classification === 'Excessive') {
        excessiveCount++;
      }
      if (metrics.idleMinutes > maxIdle) {
        maxIdle = metrics.idleMinutes;
      }
    }

    const necessaryIdleMinutes = Math.max(0, totalIdleMinutes - avoidableIdleMinutes);
    const percentageAvoidable = totalIdleMinutes > 0 ? (avoidableIdleMinutes / totalIdleMinutes) * 100 : 0;
    const avgIdle = group.records.length > 0 ? totalIdleMinutes / group.records.length : 0;
    const breachFrequencyPercent = group.records.length > 0 ? (excessiveCount / group.records.length) * 100 : 0;
    const severity = determineSeverity(avoidableCo2Kg, breachFrequencyPercent);

    analyzedGroups.push({
      id: `HOTSPOT-${group.airportCode}-${group.terminalId}-${group.gateId}-${group.vehicleType.replace(/\s+/g, '')}`,
      airportId: group.airportId,
      airportName: group.airportName,
      airportCode: group.airportCode,
      terminalId: group.terminalId,
      gateId: group.gateId,
      vehicleType: group.vehicleType,
      recordCount: group.records.length,
      excessiveEventsCount: excessiveCount,
      breachFrequencyPercent: Number(breachFrequencyPercent.toFixed(1)),
      totalIdleMinutes: Math.round(totalIdleMinutes),
      necessaryIdleMinutes: Math.round(necessaryIdleMinutes),
      avoidableIdleMinutes: Math.round(avoidableIdleMinutes),
      averageIdleDuration: Number(avgIdle.toFixed(1)),
      maxIdleDuration: maxIdle,
      totalCo2Kg: Number(totalCo2Kg.toFixed(2)),
      avoidableCo2Kg: Number(avoidableCo2Kg.toFixed(2)),
      percentageAvoidable: Number(percentageAvoidable.toFixed(1)),
      severity,
      records: group.records
    });
  }

  // Sort groups by avoidableCo2Kg descending
  analyzedGroups.sort((a, b) => b.avoidableCo2Kg - a.avoidableCo2Kg);

  const primaryGroup = analyzedGroups[0];
  if (!primaryGroup) return null;

  // Calculate Airport Baseline for comparison
  let airportTotalIdle = 0;
  let airportAvoidableIdle = 0;
  for (const r of records) {
    airportTotalIdle += r.idleMinutes;
    airportAvoidableIdle += r.avoidableIdleMinutes;
  }
  const airportAvgIdle = records.length > 0 ? airportTotalIdle / records.length : 0;
  const airportAvoidablePct = airportTotalIdle > 0 ? (airportAvoidableIdle / airportTotalIdle) * 100 : 0;

  // Calculate Daily excessive idling trend for primary hotspot
  const dailyMap = new Map();
  for (const r of primaryGroup.records) {
    const dayStr = r.timestamp.slice(0, 10);
    if (!dailyMap.has(dayStr)) {
      dailyMap.set(dayStr, { date: dayStr, totalEvents: 0, excessiveEvents: 0, avoidableCo2Kg: 0 });
    }
    const item = dailyMap.get(dayStr);
    item.totalEvents++;
    if (r.idleMinutes > DEFAULT_ALLOWED_IDLE_MINUTES + 10 && !r.isOperationalException) {
      item.excessiveEvents++;
    }
    item.avoidableCo2Kg += r.avoidableCo2Kg;
  }
  const dailyTrend = Array.from(dailyMap.values()).map(d => ({
    date: d.date,
    totalEvents: d.totalEvents,
    excessiveEvents: d.excessiveEvents,
    avoidableCo2Kg: Number(d.avoidableCo2Kg.toFixed(2))
  })).sort((a, b) => a.date.localeCompare(b.date));

  // Calculate Idle duration distribution bins
  const distributionBins = [
    { label: '0-15m (Within limit)', count: 0 },
    { label: '16-25m (Review)', count: 0 },
    { label: '26-35m (Excessive)', count: 0 },
    { label: '>35m (Severe)', count: 0 }
  ];

  for (const r of primaryGroup.records) {
    if (r.idleMinutes <= 15) {
      distributionBins[0].count++;
    } else if (r.idleMinutes <= 25) {
      distributionBins[1].count++;
    } else if (r.idleMinutes <= 35) {
      distributionBins[2].count++;
    } else {
      distributionBins[3].count++;
    }
  }

  // Analysis period
  const timestamps = primaryGroup.records.map(r => new Date(r.timestamp).getTime());
  const minTime = new Date(Math.min(...timestamps)).toISOString().slice(0, 10);
  const maxTime = new Date(Math.max(...timestamps)).toISOString().slice(0, 10);

  return {
    hotspotId: primaryGroup.id,
    banner: {
      title: 'Primary Operational Carbon Hotspot Detected',
      airport: airport.name,
      airportCode: airport.code,
      location: airport.location,
      terminal: primaryGroup.terminalId,
      gate: primaryGroup.gateId,
      vehicleType: primaryGroup.vehicleType,
      severity: primaryGroup.severity,
      analysisPeriod: `${minTime} to ${maxTime} (7 Days Synthetic Observation)`,
      oneSentenceExplanation: `Stationary ${primaryGroup.vehicleType.toLowerCase()}s at Terminal ${primaryGroup.terminalId}, Gate ${primaryGroup.gateId} repeatedly exceeded the ${DEFAULT_ALLOWED_IDLE_MINUTES}-minute threshold, generating ${primaryGroup.avoidableCo2Kg} kg avoidable CO2.`
    },
    evidence: {
      analyzedRecordsCount: primaryGroup.recordCount,
      excessiveEventsCount: primaryGroup.excessiveEventsCount,
      breachFrequencyPercent: primaryGroup.breachFrequencyPercent,
      averageIdleDuration: primaryGroup.averageIdleDuration,
      maxIdleDuration: primaryGroup.maxIdleDuration,
      allowedIdleThreshold: DEFAULT_ALLOWED_IDLE_MINUTES,
      totalAvoidableMinutes: primaryGroup.avoidableIdleMinutes,
      totalIdleMinutes: primaryGroup.totalIdleMinutes,
      currentEmissionsKg: primaryGroup.totalCo2Kg,
      avoidableEmissionsKg: primaryGroup.avoidableCo2Kg,
      percentageAvoidable: primaryGroup.percentageAvoidable
    },
    patternVisualization: {
      dailyTrend,
      distributionBins,
      baselineComparison: {
        hotspotAvgIdleMinutes: primaryGroup.averageIdleDuration,
        airportAvgIdleMinutes: Number(airportAvgIdle.toFixed(1)),
        hotspotAvoidablePercent: primaryGroup.percentageAvoidable,
        airportAvoidablePercent: Number(airportAvoidablePct.toFixed(1))
      }
    },
    explanation: {
      whatWasDetected: `Persistent engine-on idling exceeding the standard ${DEFAULT_ALLOWED_IDLE_MINUTES}-minute operational threshold for ${primaryGroup.vehicleType}s at ${primaryGroup.terminalId} (Gate ${primaryGroup.gateId}).`,
      whyConsideredAvoidable: `Non-essential stationary idle duration above ${DEFAULT_ALLOWED_IDLE_MINUTES} minutes during turnaround staging periods is avoidable by applying engine-off standby protocol. Documented operational exceptions (inspections, catering refrigeration, passenger boarding) have been zero-rated and excluded from avoidable totals.`,
      whereItOccurred: `Terminal ${primaryGroup.terminalId}, Gate ${primaryGroup.gateId} (${airport.name}, ${airport.location}).`,
      howOftenItOccurred: `${primaryGroup.excessiveEventsCount} out of ${primaryGroup.recordCount} monitored events (${primaryGroup.breachFrequencyPercent}%) exceeded the idling limit during the 7-day observation.`,
      thresholdApplied: `Fixed operational threshold of ${DEFAULT_ALLOWED_IDLE_MINUTES} minutes stationary engine time. Any stationary duration past this threshold without documented safety exceptions is categorized as avoidable.`,
      dataUsed: 'Deterministic 7-day synthetic ground support equipment telemetry containing timestamps, engine states, gate positions, and fuel flow rates.',
      whatAnalysisDoesNotProve: 'This synthetic analysis does not prove individual driver intent, unforeseen pushback delays, ground traffic control holds, or mechanical troubleshooting unless explicitly tagged as an operational exception.'
    },
    recommendation: {
      ...PRIMARY_RECOMMENDATION,
      targetLocation: `Terminal ${primaryGroup.terminalId}, Gate ${primaryGroup.gateId}`,
      targetVehicleType: primaryGroup.vehicleType,
      currentAvoidableCo2Kg: primaryGroup.avoidableCo2Kg,
      evidenceSummary: `${primaryGroup.excessiveEventsCount} excessive idling events totaling ${primaryGroup.avoidableIdleMinutes} avoidable minutes observed.`
    },
    assumptions: {
      emissionFactorKgCo2PerLiter: DEFAULT_EMISSION_FACTOR,
      allowedIdleMinutes: DEFAULT_ALLOWED_IDLE_MINUTES,
      isSynthetic: true
    }
  };
}

module.exports = {
  identifyHotspots
};

