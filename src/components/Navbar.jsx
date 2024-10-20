import { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import LocationButton from './LocationButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import { setUnit } from '../redux/locationSlice.js';

const Navbar = () => {
  const dispatch = useDispatch();

  const { city, unit } = useSelector((state) => state.location);
  const theme = useSelector((state) => state.theme.theme);
  
  const toggleUnit = () => {
    dispatch(setUnit(unit === 'C' ? 'F' : 'C'));
  };

  return (
    <div
      className={`sticky top-0 flex justify-between items-center p-4 h-16 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
      } rounded-lg p-6 shadow-lg h-full gap-4 z-50`}
    >
      {/* Left side: Search bar */}
      <div className="flex items-center">
        <SearchBar />
      </div>

      {/* Middle: Location button */}
      <div className="h-full flex items-center">
        {city && <LocationButton />}
      </div>

      {/* Right side: Unit and Theme Toggles */}
      <div className="flex items-center gap-4 h-full">
        {/* Unit Toggle Button */}
        <div
          className={`flex items-center gap-2 p-2 rounded-md h-10 ${
            theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          <button onClick={toggleUnit} className="flex items-center">
            <span>°{unit}</span>
          </button>
        </div>

        {/* Theme Toggle Button */}
        
          <button
            onClick={() => dispatch(toggleTheme())} // Dispatch theme toggle action
            className={`p-2 rounded-md h-10 ${
              theme === 'dark' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
            }`}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        
        
      </div>
    </div>
  );
};

export default Navbar;
