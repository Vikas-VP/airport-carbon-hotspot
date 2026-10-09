/**
 * Accessibility helper utilities
 */
export function handleAriaKeyDown(callback) {
  return (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  };
}

export function handleEscapeKey(callback) {
  return (e) => {
    if (e.key === 'Escape') {
      callback(e);
    }
  };
}

