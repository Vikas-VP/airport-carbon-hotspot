import apiClient from './apiClient';

export const getOperations = async (airportId, params = {}) => {
  return apiClient.get(`/operations/${airportId}`, { params });
};

