import { useDispatch, useSelector } from "react-redux";
import { setShowPopup } from "../redux/locationSlice";

const AlertPopup = ({ triggeredAlerts }) => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${theme === 'dark' ? 'bg-gray-900 bg-opacity-80' : 'bg-gray-200 bg-opacity-80'
        }`}
    >
      <div
        className={`w-96 p-6 rounded-lg shadow-lg transition-transform duration-300 transform ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
          }`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Triggered Alerts</h2>
        <ul className="space-y-2">
          {triggeredAlerts.map((alert, index) => (
            <li key={index} className="border-b pb-2">
              <span className="font-semibold">{alert.city}:</span>
              <span> Current Temp {alert.currentTemp}°C exceeds Threshold {alert.thresholdTemp}°C</span>
            </li>
          ))}
        </ul>
        <div className="text-center mt-4">
          <button
            className={`mt-4 px-4 py-2 rounded transition-all ${theme === 'dark'
                ? 'bg-blue-500 hover:bg-blue-400 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            onClick={() => dispatch(setShowPopup(false))}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
