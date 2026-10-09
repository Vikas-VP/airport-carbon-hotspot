import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAirports } from '../api/airportApi';
import { DEFAULT_AIRPORT_ID } from '../utils/constants';
import { useToast } from './ToastContext';

const AirportContext = createContext();

export const AIRPORT_STORAGE_KEY = 'airport_carbon_selected_airport';

export function AirportProvider({ children }) {
  const [airports, setAirports] = useState([]);
  const [selectedAirportId, setSelectedAirportIdState] = useState(() => {
    try {
      return localStorage.getItem(AIRPORT_STORAGE_KEY) || DEFAULT_AIRPORT_ID;
    } catch {
      return DEFAULT_AIRPORT_ID;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToast } = useToast();

  const fetchAirports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAirports();
      const list = response.data || [];
      setAirports(list);

      // Validate saved airport ID
      let currentId = selectedAirportId;
      try {
        const saved = localStorage.getItem(AIRPORT_STORAGE_KEY);
        if (saved && list.some((a) => a.id.toLowerCase() === saved.toLowerCase())) {
          currentId = saved.toLowerCase();
        } else if (list.length > 0 && !list.some((a) => a.id.toLowerCase() === currentId.toLowerCase())) {
          currentId = list[0].id;
        }
      } catch {
        if (list.length > 0 && !list.some((a) => a.id.toLowerCase() === currentId.toLowerCase())) {
          currentId = list[0].id;
        }
      }

      setSelectedAirportIdState(currentId);
      try {
        localStorage.setItem(AIRPORT_STORAGE_KEY, currentId);
      } catch {
        // ignore storage errors
      }
    } catch (err) {
      console.error('Error fetching synthetic airports:', err);
      setError(err.message || 'Failed to load airport catalog');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]);

  const selectAirport = useCallback((id) => {
    const cleanId = (id || '').toLowerCase();
    setSelectedAirportIdState((prevId) => {
      if (prevId === cleanId) return prevId;

      try {
        localStorage.setItem(AIRPORT_STORAGE_KEY, cleanId);
      } catch {
        // ignore
      }

      const match = airports.find((a) => a.id.toLowerCase() === cleanId);
      if (match) {
        addToast({
          message: `Switched operational scope to ${match.name} (${match.code})`,
          type: 'info'
        });
      }

      return cleanId;
    });
  }, [airports, addToast]);

  const selectedAirport = airports.find((a) => a.id.toLowerCase() === selectedAirportId.toLowerCase()) || null;

  return (
    <AirportContext.Provider
      value={{
        airports,
        selectedAirportId,
        selectedAirport,
        setSelectedAirportId: selectAirport,
        loading,
        error,
        refreshAirports: fetchAirports
      }}
    >
      {children}
    </AirportContext.Provider>
  );
}

export function useAirport() {
  const context = useContext(AirportContext);
  if (!context) {
    throw new Error('useAirport must be used within an AirportProvider');
  }
  return context;
}

