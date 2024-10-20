import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from '../api/weatherApi';
import { setCountry, setHumidity, setLatitude, setLongitude, setPressure, setSunRise, setSunSet, setTemperature, setVisibility, setWindSpeed } from '../redux/locationSlice';
import { convertToFahrenheit, formatTime } from '../constant/config';
import { setIsLoading } from '../redux/themeSlice';

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux
  const { city, unit } = useSelector((state) => state.location);

  const [error, setError] = useState(null);

  // Initialize state with some mock data
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      dispatch(setIsLoading(true))
      try {
        const data = await fetchCurrentWeather(city);
        const formattedSunRise = formatTime(data.sunrise);
        const formattedSunSet = formatTime(data.sunset);
        
        dispatch(setLatitude(data.coordinates.lat));
        dispatch(setLongitude(data.coordinates.lon));
        dispatch(setTemperature(data.temperature)); dispatch(setVisibility(data.visibility));
        dispatch(setHumidity(data.humidity));
        dispatch(setWindSpeed(data.wind.speed));
        dispatch(setPressure(data.pressure));
        dispatch(setSunRise(formattedSunRise));
        dispatch(setSunSet(formattedSunSet));
        dispatch(setCountry(data.country));


        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      }
      dispatch(setIsLoading(false))
    };

    if (city) {
      getWeather();
    }
  }, [city, dispatch]);

  

  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${theme === 'dark'
          ? 'bg-gray-700 text-white'
          : 'bg-gray-200 text-black'
        }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{weatherData
              ? unit === 'F' 
                ? `${convertToFahrenheit(weatherData.temperature)}°F` 
                : `${weatherData.temperature}°C` 
              : '--'}</h2>
          <p className="text-md font-semibold tracking-wide">
            Feels like {weatherData?.feelsLike
              ? unit === 'F' 
                ? `${convertToFahrenheit(weatherData.feelsLike)}°F` 
                : `${weatherData.feelsLike}°C` 
              : '--'} 
          </p>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CurrentWeather;
