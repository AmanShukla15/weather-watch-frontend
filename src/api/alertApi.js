import apiClient from './apiClient';  // Assuming Axios setup

// Create alert
export const createAlert = async (alertData) => {
  const response = await apiClient.post('/alert/create', alertData);
  return response.data;
};

// Fetch all alerts
export const getAllAlerts = async () => {
  const response = await apiClient.get('/alert/all');
  return response.data;
};

// Delete an alert
export const deleteAlert = async (id) => {
  const response = await apiClient.delete(`/alert/delete/${id}`);
  return response.data;
};

// Trigger alerts
export const fetchtriggerAlerts = async () => {
  const response = await apiClient.get('/alert/trigger');
  return response.data;
};
