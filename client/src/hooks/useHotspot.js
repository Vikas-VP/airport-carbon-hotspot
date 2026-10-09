import { useState, useEffect, useCallback } from 'react';
import { getHotspots } from '../api/hotspotApi';

export function useHotspot(airportId) {
  const [hotspot, setHotspot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotspot = useCallback(async () => {
    if (!airportId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getHotspots(airportId);
      setHotspot(response.data);
    } catch (err) {
      console.error('Error fetching hotspot data:', err);
      setError(err.message || 'Unable to load carbon hotspot analysis');
    } finally {
      setLoading(false);
    }
  }, [airportId]);

  useEffect(() => {
    fetchHotspot();
  }, [fetchHotspot]);

  return {
    hotspot,
    loading,
    error,
    refetch: fetchHotspot
  };
}

