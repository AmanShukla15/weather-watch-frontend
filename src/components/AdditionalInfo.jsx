import React from 'react';
import { useSelector } from 'react-redux'; // Importing to get the theme from Redux

const AdditionalInfo = () => {
  const theme = useSelector((state) => state.theme.theme); // Fetch the current theme
  const {sunRise, sunSet} = useSelector((state) => state.location); // Fetch the current theme

  return (
    <div
      className={`grid grid-cols-2 gap-4 p-4 mt-4 rounded-lg shadow-lg ${
        theme === 'dark'
          ? 'bg-gray-700 text-white'
          : 'bg-gray-200 text-black'
      }`}
    >
      <div>
        <p className="text-lg font-semibold">Moon Phase: <span className="font-light">78%</span></p>
      </div>
      <div>
        <p className="text-lg font-semibold">Sunrise: <span className="font-light">{sunRise} AM</span></p>
        <p className="text-lg font-semibold">Sunset: <span className="font-light">{sunSet} PM</span></p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
