function validateAirportId(airportId, validIds = []) {
  if (!airportId || typeof airportId !== 'string') {
    return { valid: false, message: 'Airport ID is required and must be a valid string' };
  }
  const cleanId = airportId.trim().toLowerCase();
  if (validIds.length > 0 && !validIds.map(id => id.toLowerCase()).includes(cleanId)) {
    return { valid: false, message: `Airport '${airportId}' not found in registered demonstration airports` };
  }
  return { valid: true, cleanId };
}

function validateSimulationBody(body) {
  const errors = [];
  if (!body) {
    return { valid: false, errors: ['Request body is required'] };
  }

  const { targetIdleMinutes } = body;
  if (targetIdleMinutes === undefined || targetIdleMinutes === null) {
    errors.push('targetIdleMinutes is required');
  } else {
    const num = Number(targetIdleMinutes);
    if (isNaN(num) || num < 5 || num > 60) {
      errors.push('targetIdleMinutes must be a number between 5 and 60 minutes');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateAirportId,
  validateSimulationBody
};

