const VEHICLE_TYPES = {
  BAGGAGE_TRACTOR: 'Baggage Tractor',
  BELT_LOADER: 'Belt Loader',
  PASSENGER_BUS: 'Passenger Bus',
  CATERING_TRUCK: 'Catering Truck',
  GROUND_POWER_VEHICLE: 'Ground Power Vehicle',
  MAINTENANCE_VEHICLE: 'Maintenance Vehicle'
};

const DEFAULT_FUEL_RATES = {
  [VEHICLE_TYPES.BAGGAGE_TRACTOR]: 3.8, // L/hr
  [VEHICLE_TYPES.BELT_LOADER]: 2.4,
  [VEHICLE_TYPES.PASSENGER_BUS]: 6.5,
  [VEHICLE_TYPES.CATERING_TRUCK]: 4.6,
  [VEHICLE_TYPES.GROUND_POWER_VEHICLE]: 5.2,
  [VEHICLE_TYPES.MAINTENANCE_VEHICLE]: 2.2
};

const CLASSIFICATION = {
  NORMAL: 'Normal',
  REVIEW: 'Review',
  EXCESSIVE: 'Excessive'
};

const SEVERITY_LEVELS = {
  MONITOR: 'Monitor',
  MODERATE: 'Moderate',
  HIGH: 'High'
};

const OPERATIONAL_EXCEPTION_REASONS = [
  'Safety inspection',
  'Emergency response',
  'Required equipment warm-up',
  'Active passenger service',
  'Approved maintenance activity',
  'Temperature-controlled catering operation'
];

const DEFAULT_EMISSION_FACTOR = 2.68; // kg CO2 / liter diesel
const DEFAULT_ALLOWED_IDLE_MINUTES = 15; // standard airport operational threshold

const PRIMARY_RECOMMENDATION = {
  title: 'Engine-Off Operating Guideline Implementation',
  statement:
    'Introduce an engine-off operating guideline for non-essential ground vehicles when stationary idle time is expected to exceed the configured operational threshold, while preserving approved safety and service exceptions.',
  operationalEffect:
    'Reduces stationary fuel burn during staging and turnaround wait periods without delaying gate release or flight dispatch.',
  scope:
    'Applicable to diesel ground support vehicles assigned to airside apron staging, baggage makeup, and turnaround zones.',
  safetyBoundary:
    'Must strictly preserve automatic bypass for active passenger boarding, emergency vehicles, refrigerated catering units, and ground power units sustaining aircraft life support or cooling.',
  disclaimer:
    'This recommendation is a planning simulation based on synthetic data. It does not replace airport operating procedures, safety requirements, or local operational approval.'
};

module.exports = {
  VEHICLE_TYPES,
  DEFAULT_FUEL_RATES,
  CLASSIFICATION,
  SEVERITY_LEVELS,
  OPERATIONAL_EXCEPTION_REASONS,
  DEFAULT_EMISSION_FACTOR,
  DEFAULT_ALLOWED_IDLE_MINUTES,
  PRIMARY_RECOMMENDATION
};

