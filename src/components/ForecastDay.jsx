import React from 'react';
import { useSelector } from 'react-redux'; // To get the theme from Redux
import { convertToFahrenheit } from '../constant/config';

const ForecastDay = ({ fullDate, max, min }) => {
  const theme = useSelector((state) => state.theme.theme);
  const { unit } = useSelector((state) => state.location);
  return (
    <div
      className={`text-center p-4 rounded-lg shadow-md min-w-[150px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
    >
      <p className="text-md font-light">{fullDate}</p>
      <p className="text-lg font-medium">
        {unit === 'F' ?
          (`${convertToFahrenheit(max)}° / ${convertToFahrenheit(min)}°F`) :
          (
            `${max}°/${min}°C`
          )
        }
      </p>
    </div>
  );
};

export default ForecastDay;
