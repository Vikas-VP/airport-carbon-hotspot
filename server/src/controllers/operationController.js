const { getActivitiesByAirport } = require('../data/activitySeed');
const { getAirportById } = require('../data/airports');

function getOperations(req, res) {
  const airportId = req.cleanAirportId;
  const airport = getAirportById(airportId);
  const allRecords = getActivitiesByAirport(airportId);

  const {
    terminalId,
    gateId,
    vehicleType,
    classification,
    date,
    minIdleMinutes,
    search,
    page = 1,
    limit = 15,
    sortBy = 'timestamp',
    sortOrder = 'desc'
  } = req.query;

  // Filter records
  let filtered = [...allRecords];

  if (terminalId && terminalId.trim() !== '') {
    filtered = filtered.filter(r => r.terminalId.toLowerCase() === terminalId.trim().toLowerCase());
  }

  if (gateId && gateId.trim() !== '') {
    filtered = filtered.filter(r => r.gateId.toLowerCase() === gateId.trim().toLowerCase());
  }

  if (vehicleType && vehicleType.trim() !== '') {
    filtered = filtered.filter(r => r.vehicleType.toLowerCase() === vehicleType.trim().toLowerCase());
  }

  if (classification && classification.trim() !== '') {
    filtered = filtered.filter(r => r.classification.toLowerCase() === classification.trim().toLowerCase());
  }

  if (date && date.trim() !== '') {
    filtered = filtered.filter(r => r.timestamp.startsWith(date.trim()));
  }

  if (minIdleMinutes !== undefined && minIdleMinutes !== '') {
    const minMins = Number(minIdleMinutes);
    if (!isNaN(minMins)) {
      filtered = filtered.filter(r => r.idleMinutes >= minMins);
    }
  }

  if (search && search.trim() !== '') {
    const s = search.trim().toLowerCase();
    filtered = filtered.filter(r =>
      r.vehicleId.toLowerCase().includes(s) ||
      r.gateId.toLowerCase().includes(s) ||
      r.vehicleType.toLowerCase().includes(s) ||
      (r.operationalStatus && r.operationalStatus.toLowerCase().includes(s)) ||
      (r.exceptionReason && r.exceptionReason.toLowerCase().includes(s))
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];

    if (sortBy === 'timestamp') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    } else if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10) || 15));
  const totalRecords = filtered.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const startIndex = (pageNum - 1) * pageSize;
  const paginatedRecords = filtered.slice(startIndex, startIndex + pageSize);

  // Available filter options for UI
  const availableTerminals = Array.from(new Set(allRecords.map(r => r.terminalId)));
  const availableGates = Array.from(new Set(allRecords.map(r => r.gateId))).sort();
  const availableVehicleTypes = Array.from(new Set(allRecords.map(r => r.vehicleType))).sort();

  res.status(200).json({
    success: true,
    data: paginatedRecords,
    meta: {
      airportId,
      airportName: airport ? airport.name : airportId,
      totalRecords,
      page: pageNum,
      limit: pageSize,
      totalPages,
      availableTerminals,
      availableGates,
      availableVehicleTypes,
      isSynthetic: true
    },
    message: 'Operational telemetry records retrieved successfully'
  });
}

module.exports = {
  getOperations
};

