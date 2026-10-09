export const APP_NAME = 'Airport Carbon Hotspot';
export const APP_TAGLINE = 'Find avoidable operational emissions before they become routine.';

export const DEFAULT_AIRPORT_ID = 'gia';

export const VEHICLE_TYPES = [
  'Baggage Tractor',
  'Belt Loader',
  'Passenger Bus',
  'Catering Truck',
  'Ground Power Vehicle',
  'Maintenance Vehicle'
];

export const CLASSIFICATIONS = ['Normal', 'Review', 'Excessive'];

export const SEVERITY_COLORS = {
  High: { text: '#E11D48', bg: '#FFE4E6', border: '#FDA4AF' },
  Moderate: { text: '#D97706', bg: '#FEF3C7', border: '#FDE68A' },
  Monitor: { text: '#059669', bg: '#D1FAE5', border: '#A7F3D0' }
};

export const SIMULATION_PRESETS = [
  { label: 'Conservative (20m)', value: 20, desc: 'Gradual ramp-down with generous buffer for ground crews' },
  { label: 'Balanced (15m)', value: 15, desc: 'Target aligned with standard airport operational threshold' },
  { label: 'Ambitious (10m)', value: 10, desc: 'Aggressive idle reduction for rapid carbon mitigation' }
];

export const SYNTHETIC_DATA_DISCLAIMER =
  'SYNTHETIC DEMONSTRATION DATA: All vehicle telematics, gate positions, fuel rates, and emissions metrics displayed in this application are generated for demonstration purposes. No connection to real-world airport operations exists.';

