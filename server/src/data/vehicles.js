const { VEHICLE_TYPES, DEFAULT_FUEL_RATES } = require('../config/constants');

const vehiclesData = [
  // Greenfield International Airport (GIA) Fleet
  { id: 'GIA-BT-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T1', status: 'Active' },
  { id: 'GIA-BT-02', airportId: 'gia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T1', status: 'Active' },
  { id: 'GIA-BT-03', airportId: 'gia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T2', status: 'Active' },
  { id: 'GIA-BT-04', airportId: 'gia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T2', status: 'Active' },
  { id: 'GIA-BL-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.BELT_LOADER, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BELT_LOADER], assignedTerminal: 'T1', status: 'Active' },
  { id: 'GIA-BL-02', airportId: 'gia', vehicleType: VEHICLE_TYPES.BELT_LOADER, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BELT_LOADER], assignedTerminal: 'T2', status: 'Active' },
  { id: 'GIA-PB-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T1', status: 'Active' },
  { id: 'GIA-PB-02', airportId: 'gia', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T2', status: 'Active' },
  { id: 'GIA-CT-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.CATERING_TRUCK, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.CATERING_TRUCK], assignedTerminal: 'T1', status: 'Active' },
  { id: 'GIA-GP-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.GROUND_POWER_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.GROUND_POWER_VEHICLE], assignedTerminal: 'T2', status: 'Active' },
  { id: 'GIA-MV-01', airportId: 'gia', vehicleType: VEHICLE_TYPES.MAINTENANCE_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.MAINTENANCE_VEHICLE], assignedTerminal: 'T1', status: 'Active' },

  // Skybridge International Airport (SIA) Fleet
  { id: 'SIA-PB-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T1', status: 'Active' },
  { id: 'SIA-PB-02', airportId: 'sia', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T1', status: 'Active' },
  { id: 'SIA-PB-03', airportId: 'sia', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T2', status: 'Active' },
  { id: 'SIA-BT-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T1', status: 'Active' },
  { id: 'SIA-BT-02', airportId: 'sia', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T2', status: 'Active' },
  { id: 'SIA-BL-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.BELT_LOADER, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BELT_LOADER], assignedTerminal: 'T1', status: 'Active' },
  { id: 'SIA-CT-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.CATERING_TRUCK, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.CATERING_TRUCK], assignedTerminal: 'T2', status: 'Active' },
  { id: 'SIA-GP-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.GROUND_POWER_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.GROUND_POWER_VEHICLE], assignedTerminal: 'T1', status: 'Active' },
  { id: 'SIA-MV-01', airportId: 'sia', vehicleType: VEHICLE_TYPES.MAINTENANCE_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.MAINTENANCE_VEHICLE], assignedTerminal: 'T2', status: 'Active' },

  // Horizon Gateway Airport (HGA) Fleet
  { id: 'HGA-CT-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.CATERING_TRUCK, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.CATERING_TRUCK], assignedTerminal: 'Cargo', status: 'Active' },
  { id: 'HGA-CT-02', airportId: 'hga', vehicleType: VEHICLE_TYPES.CATERING_TRUCK, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.CATERING_TRUCK], assignedTerminal: 'Cargo', status: 'Active' },
  { id: 'HGA-CT-03', airportId: 'hga', vehicleType: VEHICLE_TYPES.CATERING_TRUCK, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.CATERING_TRUCK], assignedTerminal: 'T1', status: 'Active' },
  { id: 'HGA-BT-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'T1', status: 'Active' },
  { id: 'HGA-BT-02', airportId: 'hga', vehicleType: VEHICLE_TYPES.BAGGAGE_TRACTOR, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BAGGAGE_TRACTOR], assignedTerminal: 'Cargo', status: 'Active' },
  { id: 'HGA-BL-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.BELT_LOADER, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.BELT_LOADER], assignedTerminal: 'T1', status: 'Active' },
  { id: 'HGA-PB-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.PASSENGER_BUS, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.PASSENGER_BUS], assignedTerminal: 'T1', status: 'Active' },
  { id: 'HGA-GP-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.GROUND_POWER_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.GROUND_POWER_VEHICLE], assignedTerminal: 'Cargo', status: 'Active' },
  { id: 'HGA-MV-01', airportId: 'hga', vehicleType: VEHICLE_TYPES.MAINTENANCE_VEHICLE, fuelType: 'Diesel', fuelRateLitersPerHour: DEFAULT_FUEL_RATES[VEHICLE_TYPES.MAINTENANCE_VEHICLE], assignedTerminal: 'Cargo', status: 'Active' }
];

function getVehiclesByAirport(airportId) {
  if (!airportId) return [];
  return vehiclesData.filter(v => v.airportId.toLowerCase() === airportId.toLowerCase());
}

module.exports = {
  vehiclesData,
  getVehiclesByAirport
};

