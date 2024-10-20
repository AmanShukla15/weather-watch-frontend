import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchHistoricalWeather } from '../api/weatherApi';
import { format, subDays } from 'date-fns'; // To handle date formatting and calculations
import { convertToFahrenheit } from '../constant/config';

const HistoryWeather = () => {
    const [historyData, setHistoryData] = useState([]);
    const [startDate, setStartDate] = useState(''); // State for start date
    const [endDate, setEndDate] = useState(''); // State for end date
    const [loading, setLoading] = useState(false); // State to track loading
    const [error, setError] = useState(null); // State to track errors

    const theme = useSelector((state) => state.theme.theme); // Fetching theme from Redux
    const { city, country } = useSelector((state) => state.location); // Fetching location data from Redux

    // Default start and end dates (previous 10 days)
    useEffect(() => {
        const today = format(new Date(), 'yyyy-MM-dd'); // Get today's date
        const tenDaysAgo = format(subDays(new Date(), 10), 'yyyy-MM-dd'); // Get date 10 days ago
        setStartDate(tenDaysAgo);
        setEndDate(today);
    }, []);

    // Fetch historical weather data
    const fetchHistoryData = async () => {
        if (startDate && endDate) {
            setLoading(true);
            setError(null); // Reset error before fetching

            try {
                const data = await fetchHistoricalWeather(city, country, startDate, endDate);
                setHistoryData(data);
            } catch (err) {
                console.error('Error fetching historical data:', err);
                setError('Failed to fetch historical weather data. Please try again.');
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        } else {
            setHistoryData([]); // Reset data if dates are not entered
        }
    };

    // Fetch data whenever start/end dates or city change
    useEffect(() => {
        fetchHistoryData();
    }, [startDate, endDate, city]);

    // Handle date input changes
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
            <h3 className="text-2xl font-semibold">Historical Weather</h3>

            {/* Date Inputs */}
            <div className="mt-2 mb-4">
                <label htmlFor="startDateInput" className="block mb-2 font-sm">Start Date (yyyy-mm-dd):</label>
                <input
                    type="date"
                    id="startDateInput"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className={`p-3 rounded-lg border-2 outline-none w-full ease-in-out focus:ring-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                    disabled={loading} // Disable input while loading
                />
            </div>

            <div className="mt-2 mb-4">
                <label htmlFor="endDateInput" className="block mb-2 font-sm">End Date (yyyy-mm-dd):</label>
                <input
                    type="date"
                    id="endDateInput"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className={`p-3 rounded-lg border-2 outline-none w-full ease-in-out focus:ring-2 focus:ring-indigo-500 ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                    disabled={loading} // Disable input while loading
                />
            </div>

            {/* Loading, Error, and Historical Data Display */}
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Historical weather data */}
            {!loading && !error && historyData?.pastWeather?.length > 0 ? (
                <div className={`mt-6 flex space-x-6 overflow-x-auto py-4 px-2 rounded-lg shadow-md
                    ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}
                    scrollbar-thin scrollbar-thumb-rounded-full scrollbar-none 
                    ${theme === 'dark' ? 'scrollbar-thumb-gray-600' : 'scrollbar-thumb-gray-400'}`}
                >
                    {historyData?.pastWeather.map((dayData, index) => (
                        <HistoryDay
                            key={index}
                            date={dayData.date}
                            max={dayData.day.maxtemp_c}
                            min={dayData.day.mintemp_c}
                        />
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center text-gray-500">Please enter a date range to see historical weather.</p>
            )}
        </div>
    );
};

const HistoryDay = ({ date, max, min }) => {
    const theme = useSelector((state) => state.theme.theme); // Fetch the current theme
    const { unit } = useSelector((state) => state.location);
    return (
        <div className={`text-center p-4 rounded-lg shadow-md min-w-[150px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <p className="text-lg font-bold">{date}</p>
            <p className="text-sm">
                Max: {
                    unit === 'F' ?
                        (`${convertToFahrenheit(max)}F°`) :
                        (`${max}C°`)
                }
            </p>
            <p className="text-sm">
                Min: {unit === 'F' ?
                    (`${convertToFahrenheit(min)}F°`) :
                    (`${min}C°`)
                }
            </p>
        </div>
    );
};

export default HistoryWeather;
