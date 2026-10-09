export function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || isNaN(value)) return '0.00';
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined || isNaN(minutes)) return '0m';
  const mins = Math.round(minutes);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  }
  return `${mins}m`;
}

export function formatCo2(kg) {
  if (kg === null || kg === undefined || isNaN(kg)) return '0.00 kg';
  return `${formatNumber(kg, 2)} kg`;
}

export function formatFuel(liters) {
  if (liters === null || liters === undefined || isNaN(liters)) return '0.00 L';
  return `${formatNumber(liters, 2)} L`;
}

export function formatPercent(value) {
  if (value === null || value === undefined || isNaN(value)) return '0.0%';
  return `${Number(value).toFixed(1)}%`;
}

export function formatDate(isoString) {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function formatDateTime(isoString) {
  if (!isoString) return '-';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch {
    return isoString;
  }
}

