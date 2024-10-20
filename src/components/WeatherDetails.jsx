import { useSelector } from 'react-redux';

const WeatherDetails = () => {
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux
  const{visibility, pressure, windSpeed, humidity}  = useSelector((state) => state.location); // Get current theme from Redux


  return (
    <div
      className={`grid grid-cols-2 gap-4 p-4 mt-4 rounded-lg shadow-lg ${
        theme === 'dark'
          ? 'bg-gray-700 text-white'
          : 'bg-gray-200 text-black'
      }`}
    >
      <div>
        <p className="text-lg font-semibold">Visibility: <span className="font-light">{visibility} km</span></p>
        <p className="text-lg font-semibold">Pressure: <span className="font-light">{pressure} mb</span></p>
      </div>
      <div>
        <p className="text-lg font-semibold">Humidity: <span className="font-light">{humidity}%</span></p>
        <p className="text-lg font-semibold">Wind Speed: <span className="font-light">{windSpeed} km/h</span></p>
      </div>
    </div>
  );
};

export default WeatherDetails;
