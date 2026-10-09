import apiClient from './apiClient';

export const runSimulation = async (airportId, payload) => {
  return apiClient.post(`/simulations/${airportId}`, payload);
};

