import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import { setCity } from '../redux/locationSlice';
import { City } from 'country-state-city';
import { setIsLoading } from '../redux/themeSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Detect theme
  const [searchTerm, setSearchTerm] = useState(null);

  // Function to fetch city suggestions with pagination
  const loadOptions = async (inputValue, loadedOptions, { page }) => {
    const pageSize = 10;
    const cities = City.getAllCities();
    const filteredCities = cities
      .filter((city) =>
        city.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice((page - 1) * pageSize, page * pageSize);

    const options = filteredCities.map((city) => ({
      label: `${city.name}, ${city.countryCode}`,
      value: city.name,
    }));

    return {
      options,
      hasMore: filteredCities.length === pageSize,
      additional: {
        page: page + 1,
      },
    };
  };

  const handleCityChange = (selectedCity) => {
    setSearchTerm(selectedCity);
    dispatch(setCity(selectedCity.value)); // Update Redux state
  };

  return (
    <div className="relative w-full max-w-xs">
      <AsyncPaginate
        value={searchTerm}
        loadOptions={loadOptions}
        onChange={handleCityChange}
        placeholder="Search for location"
        debounceTimeout={600}
        additional={{ page: 1 }}
        classNamePrefix="react-select" // Custom class for theming
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor:
              theme === 'dark' ? '#2d3748' : '#ffffff', // Background color for input
            color: theme === 'dark' ? '#e2e8f0' : '#1a202c', // Text color while typing
            borderColor:
              theme === 'dark' ? '#4a5568' : '#e2e8f0', // Border color
            '&:hover': {
              borderColor:
                theme === 'dark' ? '#718096' : '#cbd5e0', // Hover border
            },
            padding: '0.5rem', // Padding for larger input field
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff', // Dropdown background
            color: theme === 'dark' ? '#e2e8f0' : '#1a202c', // Dropdown text color
          }),
          input: (base) => ({
            ...base,
            color: theme === 'dark' ? '#e2e8f0' : '#1a202c', // Ensure input text color is visible
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused
              ? theme === 'dark'
                ? '#4a5568'
                : '#edf2f7'
              : theme === 'dark'
              ? '#2d3748'
              : '#ffffff', // Focused option background
            color: theme === 'dark' ? '#e2e8f0' : '#1a202c', // Focused option text color
            padding: '0.5rem', // Padding for options
            cursor: 'pointer',
          }),
          singleValue: (base) => ({
            ...base,
            color: theme === 'dark' ? '#e2e8f0' : '#1a202c', // Selected value text color
          }),
          placeholder: (base) => ({
            ...base,
            color: theme === 'dark' ? '#a0aec0' : '#718096', // Placeholder color
          }),
        }}
      />
    </div>
  );
};

export default SearchBar;
