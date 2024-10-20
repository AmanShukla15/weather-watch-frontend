// AlertComponent.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createAlert, deleteAlert, getAllAlerts } from '../api/alertApi';
import { FaTrash } from 'react-icons/fa';

const AlertComponent = () => {
  const theme = useSelector((state) => state.theme.theme); // Fetching theme from Redux
  const {city, showPopup} = useSelector((state) => state.location); // Fetching theme from Redux
  const [temperature, setTemperature] = useState('');
  const [threshold, setThreshold] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  // Fetch existing alerts when the component mounts
  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      try {
        const data = await getAllAlerts(); // Fetch alerts from the backend
        setAlerts(data);
      } catch (error) {
        setError('Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();

  }, [showPopup]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || !threshold) return;

    setLoading(true);
    try {
      const newAlertNew = await createAlert({ city, thresholdTemp: parseInt(threshold) });
      setAlerts([newAlertNew.newAlert, ...alerts]);
    } catch (error) {
      setError('Failed to create alert');
    } finally {
      setLoading(false);
    }
    setTemperature('');
    setThreshold('');
  };

  // Handle delete alert
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteAlert(id); // Delete alert on the backend
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (error) {
      setError('Failed to delete alert');
    } finally {
      setLoading(false);
    }
  };

  // Show message when clicking on city input
  const handleCityClick = () => {
    setInfoMessage('Change the city in the search bar.'); // Set the info message
    setTimeout(() => {
      setInfoMessage(''); // Clear the message after 3 seconds
    }, 3000);
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}>
      <h3 className="text-2xl font-semibold mb-4">Temperature Alert</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="city" className="block mb-2 font-sm">City:</label>
          <input
            type="text"
            id="city"
            value={city} // Set default value to city from Redux store
            readOnly // Make the input read-only
            onClick={handleCityClick} // Show message when clicked
            className={`p-3 rounded-lg border-2 outline-none w-full ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
          {infoMessage && <p className="text-red-500 mt-2">{infoMessage}</p>} {/* Display info message */}
        </div>


        <div className="mb-4">
          <label htmlFor="threshold" className="block mb-2 font-sm">Threshold (°C):</label>
          <input
            type="number"
            id="threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            required
            className={`p-3 rounded-lg border-2 outline-none w-full ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
          />
        </div>

        <button
          type="submit"
          className={`p-3 w-full rounded-lg font-semibold transition duration-300 ${theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
        >
          Set Alert
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className={`overflow-y-auto max-h-60 py-4 px-2 rounded-lg shadow-md scrollbar-none ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert._id} className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
              }`}>
              <div className="flex items-center">
                {alert.isActive && <span className="w-3 h-2 bg-green-500 rounded-full mr-2" />} {/* Green dot for active alerts */}
                <div className="ml-2">
                <p className="text-md font-semibold"><strong>City:</strong> <span className="font-light">{alert.city}</span></p>
                <p className="text-md"><strong>Threshold:</strong> <span className='font-light'>{alert.thresholdTemp}°C</span></p>
                <p className="text-md"><strong>Date:</strong> <span className='text-md'>{new Date(alert.createdAt).toLocaleDateString()}</span></p> {/* Format date */}
              </div>
              </div>
              <button
                onClick={() => handleDelete(alert._id)}
                className={`text-lg ${theme === 'dark' ? 'text-red-600 hover:text-red-700' : 'text-red-500 hover:text-red-600'}`}
              >
                <FaTrash /> {/* Trash icon */}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center">No alerts created yet.</p>
        )}
      </div>
    </div>
  );
};

export default AlertComponent;
