const { DEFAULT_EMISSION_FACTOR, DEFAULT_ALLOWED_IDLE_MINUTES, CLASSIFICATION, SEVERITY_LEVELS } = require('../config/constants');

/**
 * Calculates emissions metrics for a single activity record.
 */
function calculateActivityEmissions(record, options = {}) {
  const emissionFactor = options.emissionFactorKgCo2PerLiter || record.emissionFactorKgCo2PerLiter || DEFAULT_EMISSION_FACTOR;
  const allowedIdleMinutes = options.allowedIdleMinutes ?? (record.allowedIdleMinutes ?? DEFAULT_ALLOWED_IDLE_MINUTES);
  const idleMinutes = Number(record.idleMinutes) || 0;
  const fuelRate = Number(record.fuelRateLitersPerHour) || 0;
  const isException = Boolean(record.isOperationalException);

  const idleHours = idleMinutes / 60;
  const fuelConsumedLiters = idleHours * fuelRate;
  const estimatedCo2Kg = fuelConsumedLiters * emissionFactor;

  // If operational exception, avoidable idle and emissions are strictly zero
  const avoidableIdleMinutes = isException ? 0 : Math.max(idleMinutes - allowedIdleMinutes, 0);
  const avoidableFuelLiters = (avoidableIdleMinutes / 60) * fuelRate;
  const avoidableCo2Kg = avoidableFuelLiters * emissionFactor;

  // Classification
  let classification = CLASSIFICATION.NORMAL;
  if (!isException) {
    if (idleMinutes > allowedIdleMinutes + 10) {
      classification = CLASSIFICATION.EXCESSIVE;
    } else if (idleMinutes > allowedIdleMinutes) {
      classification = CLASSIFICATION.REVIEW;
    }
  }

  return {
    idleMinutes,
    idleHours: Number(idleHours.toFixed(4)),
    allowedIdleMinutes,
    fuelRateLitersPerHour: fuelRate,
    emissionFactorKgCo2PerLiter: emissionFactor,
    fuelConsumedLiters: Number(fuelConsumedLiters.toFixed(4)),
    estimatedCo2Kg: Number(estimatedCo2Kg.toFixed(4)),
    avoidableIdleMinutes,
    avoidableFuelLiters: Number(avoidableFuelLiters.toFixed(4)),
    avoidableCo2Kg: Number(avoidableCo2Kg.toFixed(4)),
    classification,
    isOperationalException: isException,
    exceptionReason: record.exceptionReason || null
  };
}

/**
 * Simulates before-and-after emissions for a set of events given a target idle threshold.
 */
function calculateSimulation({
  records,
  targetIdleMinutes = DEFAULT_ALLOWED_IDLE_MINUTES,
  emissionFactorKgCo2PerLiter = DEFAULT_EMISSION_FACTOR
}) {
  const targetIdle = Math.max(0, Number(targetIdleMinutes));

  let totalActualIdleMinutes = 0;
  let totalActualFuelLiters = 0;
  let totalActualCo2Kg = 0;

  let totalSimulatedIdleMinutes = 0;
  let totalSimulatedFuelLiters = 0;
  let totalSimulatedCo2Kg = 0;

  let affectedEventsCount = 0;

  for (const record of records) {
    const fuelRate = Number(record.fuelRateLitersPerHour) || 0;
    const actualIdleMinutes = Number(record.idleMinutes) || 0;
    const isException = Boolean(record.isOperationalException);

    // Actual emissions
    const actualHours = actualIdleMinutes / 60;
    const actualFuel = actualHours * fuelRate;
    const actualCo2 = actualFuel * emissionFactorKgCo2PerLiter;

    totalActualIdleMinutes += actualIdleMinutes;
    totalActualFuelLiters += actualFuel;
    totalActualCo2Kg += actualCo2;

    // Simulation rule:
    // Operational exceptions are not modified by target idle procedures
    if (isException) {
      totalSimulatedIdleMinutes += actualIdleMinutes;
      totalSimulatedFuelLiters += actualFuel;
      totalSimulatedCo2Kg += actualCo2;
    } else {
      // Normal/Excessive events capped to target idle minutes if actual exceeded target
      const simIdleMinutes = Math.min(actualIdleMinutes, targetIdle);
      const simFuel = (simIdleMinutes / 60) * fuelRate;
      const simCo2 = simFuel * emissionFactorKgCo2PerLiter;

      totalSimulatedIdleMinutes += simIdleMinutes;
      totalSimulatedFuelLiters += simFuel;
      totalSimulatedCo2Kg += simCo2;

      if (actualIdleMinutes > targetIdle) {
        affectedEventsCount += 1;
      }
    }
  }

  // Never negative savings
  const savedIdleMinutes = Math.max(0, totalActualIdleMinutes - totalSimulatedIdleMinutes);
  const savedFuelLiters = Math.max(0, totalActualFuelLiters - totalSimulatedFuelLiters);
  const savedCo2Kg = Math.max(0, totalActualCo2Kg - totalSimulatedCo2Kg);
  const percentageReduction = totalActualCo2Kg > 0 ? (savedCo2Kg / totalActualCo2Kg) * 100 : 0;

  return {
    before: {
      idleMinutes: Math.round(totalActualIdleMinutes),
      fuelLiters: Number(totalActualFuelLiters.toFixed(2)),
      co2Kg: Number(totalActualCo2Kg.toFixed(2))
    },
    after: {
      idleMinutes: Math.round(totalSimulatedIdleMinutes),
      fuelLiters: Number(totalSimulatedFuelLiters.toFixed(2)),
      co2Kg: Number(totalSimulatedCo2Kg.toFixed(2))
    },
    savings: {
      idleMinutes: Math.round(savedIdleMinutes),
      fuelLiters: Number(savedFuelLiters.toFixed(2)),
      co2Kg: Number(savedCo2Kg.toFixed(2)),
      percentage: Number(percentageReduction.toFixed(1))
    },
    affectedEventsCount,
    totalRecords: records.length,
    targetIdleMinutes: targetIdle,
    emissionFactorKgCo2PerLiter
  };
}

/**
 * Determines hotspot severity deterministically.
 */
function determineSeverity(avoidableCo2Kg, breachFrequencyPercent) {
  if (avoidableCo2Kg >= 100 || breachFrequencyPercent >= 40) {
    return SEVERITY_LEVELS.HIGH;
  }
  if (avoidableCo2Kg >= 40 || breachFrequencyPercent >= 20) {
    return SEVERITY_LEVELS.MODERATE;
  }
  return SEVERITY_LEVELS.MONITOR;
}

module.exports = {
  calculateActivityEmissions,
  calculateSimulation,
  determineSeverity
};

