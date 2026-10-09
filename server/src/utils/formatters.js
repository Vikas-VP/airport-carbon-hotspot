/**
 * Standard utility formatters for numerical values and units
 */
function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '0.00';
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined || isNaN(minutes)) return '0m';
  const mins = Math.round(minutes);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  }
  return `${mins}m`;
}

function formatCo2(kg) {
  if (kg === null || kg === undefined || isNaN(kg)) return '0.00 kg CO2';
  return `${formatNumber(kg, 2)} kg CO2`;
}

module.exports = {
  formatNumber,
  formatMinutes,
  formatCo2
};

