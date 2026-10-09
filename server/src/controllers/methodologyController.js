const { DEFAULT_EMISSION_FACTOR, DEFAULT_ALLOWED_IDLE_MINUTES, DEFAULT_FUEL_RATES, OPERATIONAL_EXCEPTION_REASONS } = require('../config/constants');

function getMethodology(req, res) {
  res.status(200).json({
    success: true,
    data: {
      title: 'Airport Carbon Hotspot Methodology & Calculation Model',
      tagline: 'Find avoidable operational emissions before they become routine.',
      operationalSource: 'Ground Support Equipment (GSE) Stationary Idling',
      hotspotDefinition: 'An airport terminal/gate/vehicle-type combination that exhibits the highest cumulative volume of non-essential stationary idling beyond the baseline threshold.',
      baselineThreshold: {
        value: DEFAULT_ALLOWED_IDLE_MINUTES,
        unit: 'minutes',
        description: 'Standard maximum permitted stationary idling without approved exception.'
      },
      emissionFactor: {
        value: DEFAULT_EMISSION_FACTOR,
        unit: 'kg CO2 per liter',
        fuelType: 'Diesel Ground Support Fuel',
        note: 'Configurable demonstration assumption based on standard diesel combustion stoichiometry.'
      },
      fuelRates: DEFAULT_FUEL_RATES,
      formulas: {
        activityEmissions: [
          'idleHours = idleMinutes / 60',
          'fuelConsumedLiters = idleHours * fuelRateLitersPerHour',
          'estimatedCo2Kg = fuelConsumedLiters * emissionFactorKgCo2PerLiter',
          'avoidableIdleMinutes = isOperationalException ? 0 : max(idleMinutes - allowedIdleMinutes, 0)',
          'avoidableFuelLiters = (avoidableIdleMinutes / 60) * fuelRateLitersPerHour',
          'avoidableCo2Kg = avoidableFuelLiters * emissionFactorKgCo2PerLiter'
        ],
        simulation: [
          'simulatedIdleMinutes = isOperationalException ? actualIdleMinutes : min(actualIdleMinutes, targetIdleMinutes)',
          'simulatedFuelLiters = (simulatedIdleMinutes / 60) * fuelRateLitersPerHour',
          'simulatedCo2Kg = simulatedFuelLiters * emissionFactorKgCo2PerLiter',
          'co2SavingsKg = max(currentCo2Kg - simulatedCo2Kg, 0)',
          'percentageReduction = currentCo2Kg > 0 ? (co2SavingsKg / currentCo2Kg) * 100 : 0'
        ]
      },
      operationalExceptions: {
        policy: 'Any stationary idle event marked as an operational exception is assigned zero avoidable minutes and zero avoidable CO2.',
        approvedCategories: OPERATIONAL_EXCEPTION_REASONS
      },
      safetyBoundaries: [
        'The application strictly analyzes synthetic demonstration data and does not interface with physical vehicle systems.',
        'No recommendations alter mandatory pre-flight checklists, engine warm-ups required by manufacturer spec, or passenger air-conditioning during active embarkation.',
        'Emergency response vehicles and security apparatus are strictly exempt from idle curtailment.'
      ],
      dataDictionary: [
        { field: 'id', type: 'string', description: 'Unique telemetry activity record identifier' },
        { field: 'airportId', type: 'string', description: 'Identifier of the synthetic airport (gia, sia, hga)' },
        { field: 'terminalId', type: 'string', description: 'Terminal designation (e.g., T1, T2, Cargo)' },
        { field: 'gateId', type: 'string', description: 'Gate or aircraft stand position identifier' },
        { field: 'vehicleId', type: 'string', description: 'Unique airside fleet equipment identification code' },
        { field: 'vehicleType', type: 'string', description: 'Equipment category (Baggage Tractor, Passenger Bus, etc.)' },
        { field: 'timestamp', type: 'ISO 8601 string', description: 'Date and time of observed stationary event' },
        { field: 'engineStatus', type: 'string', description: 'Physical engine state ("On (Stationary)")' },
        { field: 'operationalStatus', type: 'string', description: 'Current task context (Waiting at Gate, Staging, etc.)' },
        { field: 'idleMinutes', type: 'integer', description: 'Total observed continuous stationary engine time' },
        { field: 'allowedIdleMinutes', type: 'integer', description: 'Configured operational baseline threshold (15m)' },
        { field: 'fuelRateLitersPerHour', type: 'number', description: 'Equipment diesel consumption rate during idle' },
        { field: 'emissionFactorKgCo2PerLiter', type: 'number', description: 'Greenhouse gas conversion factor (2.68 kg CO2/L)' },
        { field: 'isOperationalException', type: 'boolean', description: 'Flag indicating whether idle was operationally necessary' },
        { field: 'exceptionReason', type: 'string | null', description: 'Documented rationale for necessary operational idle' },
        { field: 'avoidableIdleMinutes', type: 'integer', description: 'Minutes above allowed threshold (0 if exception)' },
        { field: 'avoidableCo2Kg', type: 'number', description: 'Estimated carbon emissions attributable to excess idle' },
        { field: 'classification', type: 'string', description: 'Classification badge: Normal, Review, Excessive' }
      ]
    },
    meta: {
      isSynthetic: true,
      lastUpdated: '2026-10-07'
    },
    message: 'Methodology and assumptions retrieved successfully'
  });
}

module.exports = {
  getMethodology
};

