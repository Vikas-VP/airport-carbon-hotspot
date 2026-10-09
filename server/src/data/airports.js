const airportsData = [
  {
    id: 'gia',
    name: 'Greenfield International Airport',
    code: 'GIA',
    location: 'Hyderabad, India',
    description: 'Major southern aviation hub with heavy domestic transit and high-frequency turnarounds.',
    coordinatesLabel: '17.2403° N, 78.4294° E',
    isSynthetic: true,
    terminals: [
      {
        id: 'T1',
        name: 'Terminal 1 (Domestic)',
        type: 'Passenger',
        gates: ['G01', 'G02', 'G03', 'G04', 'G05', 'G06']
      },
      {
        id: 'T2',
        name: 'Terminal 2 (International & Mixed)',
        type: 'Passenger',
        gates: ['G07', 'G08', 'G09', 'G10', 'G11', 'G12']
      }
    ],
    hotspotHint: {
      terminal: 'T2',
      gate: 'G12',
      vehicleType: 'Baggage Tractor',
      reason: 'Frequent baggage tractor idling during turnaround wait periods between peak arrivals and delayed dispatch.'
    }
  },
  {
    id: 'sia',
    name: 'Skybridge International Airport',
    code: 'SIA',
    location: 'Bengaluru, India',
    description: 'High-tech smart gateway with multiple remote stands and continuous passenger bus transfers.',
    coordinatesLabel: '13.1986° N, 77.7066° E',
    isSynthetic: true,
    terminals: [
      {
        id: 'T1',
        name: 'Terminal 1 (Main Hub)',
        type: 'Passenger',
        gates: ['S01', 'S02', 'S03', 'S04', 'S05', 'S06', 'S07', 'S08']
      },
      {
        id: 'T2',
        name: 'Terminal 2 (Garden Terminal)',
        type: 'Passenger',
        gates: ['S09', 'S10', 'S11', 'S12']
      }
    ],
    hotspotHint: {
      terminal: 'T1',
      gate: 'S08',
      vehicleType: 'Passenger Bus',
      reason: 'Buses keeping diesel engines running at remote stand holding bays while waiting for late boarding calls.'
    }
  },
  {
    id: 'hga',
    name: 'Horizon Gateway Airport',
    code: 'HGA',
    location: 'Chennai, India',
    description: 'Coastal international gateway supporting substantial air cargo logistics and long-haul catering operations.',
    coordinatesLabel: '12.9941° N, 80.1709° E',
    isSynthetic: true,
    terminals: [
      {
        id: 'T1',
        name: 'Terminal 1 (Commercial)',
        type: 'Passenger',
        gates: ['C01', 'C02', 'C03']
      },
      {
        id: 'Cargo',
        name: 'Cargo Terminal & Logistics Hub',
        type: 'Cargo & Logistics',
        gates: ['C04', 'C05', 'C06', 'C07']
      }
    ],
    hotspotHint: {
      terminal: 'Cargo',
      gate: 'C04',
      vehicleType: 'Catering Truck',
      reason: 'Catering trucks idling with engine running for hydraulic lift standby ahead of widebody cargo re-provisioning.'
    }
  }
];

function getAirportsList() {
  return airportsData;
}

function getAirportById(id) {
  if (!id) return null;
  return airportsData.find(a => a.id.toLowerCase() === id.toLowerCase()) || null;
}

module.exports = {
  airportsData,
  getAirportsList,
  getAirportById
};

