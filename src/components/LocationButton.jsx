import { useSelector } from 'react-redux';

const LocationButton = () => {
  const { city, temperature } = useSelector((state) => state.location);
  const { theme, isLoading } = useSelector((state) => state.theme); // Get current theme from Redux


  return isLoading ? (<div>Loading...</div>) : (
  <button
    className={`flex items-center gap-2 p-2 rounded-md ${theme === 'dark'
      ? 'bg-gray-700 text-white'
      : 'bg-gray-200 text-black'
      }`}
  >
    <span>{city}</span>
    <span className='font-semibold'>{temperature}°</span>
  </button>
  )

};

export default LocationButton;
