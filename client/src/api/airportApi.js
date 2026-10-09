import apiClient from './apiClient';

export const getAirports = async () => {
  return apiClient.get('/airports');
};

export const getAirportById = async (airportId) => {
  return apiClient.get(`/airports/${airportId}`);
};

