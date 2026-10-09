import apiClient from './apiClient';

export const getDashboardData = async (airportId) => {
  return apiClient.get(`/dashboard/${airportId}`);
};

