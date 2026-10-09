const { airportsData } = require('./airports');
const { vehiclesData } = require('./vehicles');
const {
  DEFAULT_ALLOWED_IDLE_MINUTES,
  DEFAULT_EMISSION_FACTOR,
  OPERATIONAL_EXCEPTION_REASONS
} = require('../config/constants');
const { calculateActivityEmissions } = require('../utils/calculations');

// Linear congruential generator for deterministic pseudo-random sequence
function createPRNG(seed = 123456789) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function next() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateDeterministicActivities() {
  const prng = createPRNG(424242);
  const activities = [];
  let recordIdCounter = 1;

  // Base dates: 7 days (e.g., Oct 01, 2026 to Oct 07, 2026)
  const baseDate = new Date('2026-10-01T06:00:00Z');

  for (const airport of airportsData) {
    const airportVehicles = vehiclesData.filter(v => v.airportId === airport.id);
    const hotspot = airport.hotspotHint;

    // Loop through 7 days
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const currentDay = new Date(baseDate);
      currentDay.setUTCDate(baseDate.getUTCDate() + dayOffset);

      // Generate 18-24 operational activity records per day per airport
      const dailyCount = 18 + Math.floor(prng() * 6);

      for (let i = 0; i < dailyCount; i++) {
        const hour = 6 + Math.floor(prng() * 16); // 06:00 to 22:00
        const minute = Math.floor(prng() * 60);
        const second = Math.floor(prng() * 60);

        const timestamp = new Date(currentDay);
        timestamp.setUTCHours(hour, minute, second);

        // Decide if this record is targeted at the primary hotspot
        // ~25% of records will be assigned to the primary hotspot to establish clear hotspot ranking
        const isHotspotCandidate = prng() < 0.28;

        let terminalId;
        let gateId;
        let vehicle;

        if (isHotspotCandidate) {
          terminalId = hotspot.terminal;
          gateId = hotspot.gate;
          // Pick vehicle matching hotspot type
          const matchingVehicles = airportVehicles.filter(v => v.vehicleType === hotspot.vehicleType);
          vehicle = matchingVehicles[Math.floor(prng() * matchingVehicles.length)] || airportVehicles[0];
        } else {
          // Pick random terminal and gate from airport
          const term = airport.terminals[Math.floor(prng() * airport.terminals.length)];
          terminalId = term.id;
          gateId = term.gates[Math.floor(prng() * term.gates.length)];
          // Pick any vehicle
          vehicle = airportVehicles[Math.floor(prng() * airportVehicles.length)];
        }

        // Determine if this is an operational exception (~8-10% rate)
        // Exceptions must never occur excessively at the hotspot to keep hotspot avoidable
        const isExceptionCandidate = prng() < 0.09;
        let isOperationalException = false;
        let exceptionReason = null;

        if (isExceptionCandidate) {
          isOperationalException = true;
          exceptionReason = OPERATIONAL_EXCEPTION_REASONS[Math.floor(prng() * OPERATIONAL_EXCEPTION_REASONS.length)];
        }

        // Determine idle duration (minutes)
        let idleMinutes = 0;
        if (isHotspotCandidate && !isOperationalException) {
          // High concentration of excessive idling: 28 to 48 minutes
          idleMinutes = 28 + Math.floor(prng() * 20);
        } else if (isOperationalException) {
          // Exceptions might have longer idle (e.g. warm-up, passenger boarding), but zero avoidable
          idleMinutes = 20 + Math.floor(prng() * 25);
        } else {
          // General distribution:
          // 65% normal (5 - 14 mins), 25% review (15 - 24 mins), 10% occasional excessive (25 - 32 mins)
          const roll = prng();
          if (roll < 0.65) {
            idleMinutes = 5 + Math.floor(prng() * 10); // 5 to 14
          } else if (roll < 0.90) {
            idleMinutes = 15 + Math.floor(prng() * 10); // 15 to 24
          } else {
            idleMinutes = 25 + Math.floor(prng() * 8); // 25 to 32
          }
        }

        const operationalStatuses = [
          'Waiting at Gate',
          'Turnaround Wait',
          'Staging Zone Standby',
          'Delayed Baggage Transfer',
          'Holding Area Wait',
          'Apron Staging'
        ];
        const operationalStatus = isOperationalException
          ? `Exception: ${exceptionReason}`
          : operationalStatuses[Math.floor(prng() * operationalStatuses.length)];

        const rawRecord = {
          id: `REC-${airport.code}-${String(recordIdCounter++).padStart(5, '0')}`,
          airportId: airport.id,
          terminalId,
          gateId,
          vehicleId: vehicle.id,
          vehicleType: vehicle.vehicleType,
          timestamp: timestamp.toISOString(),
          engineStatus: 'On (Stationary)',
          operationalStatus,
          idleMinutes,
          allowedIdleMinutes: DEFAULT_ALLOWED_IDLE_MINUTES,
          fuelRateLitersPerHour: vehicle.fuelRateLitersPerHour,
          emissionFactorKgCo2PerLiter: DEFAULT_EMISSION_FACTOR,
          isOperationalException,
          exceptionReason
        };

        // Attach pre-calculated metrics for convenience & integrity
        const metrics = calculateActivityEmissions(rawRecord);

        activities.push({
          ...rawRecord,
          ...metrics
        });
      }
    }
  }

  // Sort chronologically ascending
  activities.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  return activities;
}

const activitiesData = generateDeterministicActivities();

function getAllActivities() {
  return activitiesData;
}

function getActivitiesByAirport(airportId) {
  if (!airportId) return [];
  return activitiesData.filter(a => a.airportId.toLowerCase() === airportId.toLowerCase());
}

module.exports = {
  activitiesData,
  getAllActivities,
  getActivitiesByAirport
};

