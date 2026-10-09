import { useState, useEffect, useCallback } from 'react';
import { getDashboardData } from '../api/dashboardApi';

export function useDashboard(airportId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    if (!airportId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getDashboardData(airportId);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Unable to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, [airportId]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    data,
    loading,
    error,
    refetch: fetchDashboard
  };
}

