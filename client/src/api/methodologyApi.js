import apiClient from './apiClient';

export const getMethodologyData = async () => {
  return apiClient.get('/methodology');
};

