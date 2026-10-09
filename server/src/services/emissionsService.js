const { calculateActivityEmissions, determineSeverity } = require('../utils/calculations');
const { DEFAULT_EMISSION_FACTOR, DEFAULT_ALLOWED_IDLE_MINUTES } = require('../config/constants');

function summarizeEmissions(records) {
  let totalIdleMinutes = 0;
  let totalFuelLiters = 0;
  let totalCo2Kg = 0;
  let avoidableIdleMinutes = 0;
  let avoidableFuelLiters = 0;
  let avoidableCo2Kg = 0;
  let excessiveCount = 0;
  let reviewCount = 0;
  let normalCount = 0;
  let exceptionCount = 0;

  for (const r of records) {
    const metrics = calculateActivityEmissions(r);
    totalIdleMinutes += metrics.idleMinutes;
    totalFuelLiters += metrics.fuelConsumedLiters;
    totalCo2Kg += metrics.estimatedCo2Kg;

    avoidableIdleMinutes += metrics.avoidableIdleMinutes;
    avoidableFuelLiters += metrics.avoidableFuelLiters;
    avoidableCo2Kg += metrics.avoidableCo2Kg;

    if (metrics.isOperationalException) {
      exceptionCount++;
    } else if (metrics.classification === 'Excessive') {
      excessiveCount++;
    } else if (metrics.classification === 'Review') {
      reviewCount++;
    } else {
      normalCount++;
    }
  }

  const necessaryIdleMinutes = Math.max(0, totalIdleMinutes - avoidableIdleMinutes);

  return {
    totalRecords: records.length,
    totalIdleMinutes: Math.round(totalIdleMinutes),
    necessaryIdleMinutes: Math.round(necessaryIdleMinutes),
    avoidableIdleMinutes: Math.round(avoidableIdleMinutes),
    totalFuelLiters: Number(totalFuelLiters.toFixed(2)),
    avoidableFuelLiters: Number(avoidableFuelLiters.toFixed(2)),
    totalCo2Kg: Number(totalCo2Kg.toFixed(2)),
    avoidableCo2Kg: Number(avoidableCo2Kg.toFixed(2)),
    percentageAvoidableCo2: totalCo2Kg > 0 ? Number(((avoidableCo2Kg / totalCo2Kg) * 100).toFixed(1)) : 0,
    counts: {
      normal: normalCount,
      review: reviewCount,
      excessive: excessiveCount,
      exceptions: exceptionCount,
      exceedingThreshold: excessiveCount + reviewCount
    }
  };
}

module.exports = {
  summarizeEmissions,
  determineSeverity,
  DEFAULT_EMISSION_FACTOR,
  DEFAULT_ALLOWED_IDLE_MINUTES
};

