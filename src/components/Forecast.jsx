import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForecastDay from './ForecastDay';
import { fetchFutureWeather } from '../api/weatherApi';
import { setHourlyTemp } from '../redux/locationSlice';

const Forecast = () => {
  const dispatch = useDispatch();
  const [forecastData, setForecastData] = useState([]);
  const [days, setDays] = useState(1); // State to track the number of days
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const theme = useSelector((state) => state.theme.theme); // Fetching theme from Redux
  const { city } = useSelector((state) => state.location); // Fetch city from Redux

  const fetchFutureClimate = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
 
    try {
      const data = await fetchFutureWeather(city, days); // Fetch future weather
      setForecastData(data.futureWeather);
      dispatch(setHourlyTemp(data.hourlyUpdate));
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Fetch data whenever `days` state changes
  useEffect(() => {
    fetchFutureClimate();
  }, [days]);

  // Handle number of days input change
  const handleDaysChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 15) {
      setDays(value);
    } else if (value > 15) {
      setDays(15); // Cap at 15
    } else {
      setDays(1); // Minimum 1 day
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
      <h3 className="text-2xl font-semibold">Forecast</h3>

      {/* Input for setting the number of days */}
      <div className="mt-2 mb-4">
        <label htmlFor="daysInput" className="block mb-2 font-sm">Enter number of days (1-15):</label>
        <input
          type="number"
          id="daysInput"
          value={days}
          min="1"
          max="15"
          onChange={handleDaysChange}
          className={`p-3 rounded-lg border-2 outline-none w-full ease-in-out focus:ring-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          disabled={loading} // Disable input while loading
        />
      </div>

      {/* Display loading spinner or error */}
      {loading && (
        <p className="text-center p-4 text-gray-500">Loading...</p>
      )}
      {error && (
        <p className="text-center p-4 text-red-500">{error}</p>
      )}

      {/* Forecast data scrollable horizontally */}
      {!loading && !error && forecastData.length > 0 && (
        <div className={`mt-6 flex space-x-6 overflow-x-auto py-4 px-2 rounded-lg shadow-md
          ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}
          scrollbar-thin scrollbar-thumb-rounded-full scrollbar-none 
          ${theme === 'dark' ? 'scrollbar-thumb-gray-600' : 'scrollbar-thumb-gray-400'}`}
        >
          {forecastData.map((dayData, index) => (
            <ForecastDay
              key={index}
              fullDate={dayData.date} // Use correct date format from API response
              max={dayData.day.maxtemp_c} // Max temp
              min={dayData.day.mintemp_c} // Min temp
            />
          ))}
        </div>
      )}

      {/* No result message */}
      {!loading && !error && forecastData.length === 0 && (
        <p className="text-center p-4 text-gray-500">No forecast data available</p>
      )}
    </div>
  );
};

export default Forecast;
