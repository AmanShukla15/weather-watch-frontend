import apiClient from './apiClient';

/**
 * Get current weather for a city
 * @param {string} city - Name of the city
 * @returns {Promise} - Weather data
 */
export const fetchCurrentWeather = async (city) => {
  const response = await apiClient.get(`/weather/current/${city}`);
  return response.data;
};

/**
 * Get historical weather data for a city
 * @param {string} city - Name of the city
 * @returns {Promise} - Historical weather data
 */
export const fetchHistoricalWeather = async (city, country, start, end) => {
  const response = await apiClient.get('/weather/history', {
    params: { city, country, start, end }
  });
  return response.data;
};
/**
 * Get future weather forecast for a city
 * @param {string} city - Name of the city
 * @returns {Promise} - Future weather data
 */
export const fetchFutureWeather = async (city, days) => {
  const response = await apiClient.get('/weather/forecast', { params: { city, days } });
  return response.data;
};
