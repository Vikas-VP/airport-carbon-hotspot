import { useState, useEffect, useCallback, useRef } from 'react';
import { runSimulation } from '../api/simulationApi';
import { useDebounce } from './useDebounce';

export function useSimulation(airportId, initialTarget = 15) {
  const [targetIdleMinutes, setTargetIdleMinutes] = useState(initialTarget);
  const debouncedTarget = useDebounce(targetIdleMinutes, 300);

  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const latestRequestRef = useRef(0);

  const executeSimulation = useCallback(async (target) => {
    if (!airportId) return;
    const requestId = ++latestRequestRef.current;
    setLoading(true);
    setError(null);
    try {
      const response = await runSimulation(airportId, {
        targetIdleMinutes: target
      });
      // Ensure we only update state if this is the latest in-flight request
      if (requestId === latestRequestRef.current) {
        setSimulation(response.data);
      }
    } catch (err) {
      if (requestId === latestRequestRef.current) {
        console.error('Simulation calculation failed:', err);
        setError(err.message || 'Failed to calculate simulation');
      }
    } finally {
      if (requestId === latestRequestRef.current) {
        setLoading(false);
      }
    }
  }, [airportId]);

  useEffect(() => {
    executeSimulation(debouncedTarget);
  }, [debouncedTarget, executeSimulation]);

  const resetTarget = useCallback(() => {
    setTargetIdleMinutes(15);
  }, []);

  return {
    targetIdleMinutes,
    setTargetIdleMinutes,
    simulation,
    loading,
    error,
    resetTarget,
    recalculate: () => executeSimulation(targetIdleMinutes)
  };
}

