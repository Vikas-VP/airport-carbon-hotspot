import apiClient from './apiClient';

export const getHotspots = async (airportId) => {
  return apiClient.get(`/hotspots/${airportId}`);
};

