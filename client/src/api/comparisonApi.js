import apiClient from './apiClient';

export const getAirportComparison = async () => {
  return apiClient.get('/comparison');
};

