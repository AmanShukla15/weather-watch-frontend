import React from 'react';
import { useSelector } from 'react-redux';
import CurrentWeather from './components/CurrentWeather.jsx';
import MapWidget from './components/MapWidget.jsx';
import Forecast from './components/Forecast.jsx';
import DetailedSummary from './components/DetailedSummary.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';
import AdditionalInfo from './components/AdditionalInfo.jsx';
import Navbar from './components/Navbar';
import HistoryWeather from './components/HistoryWeather.jsx';
import AlertComponent from './components/AlertComponent.jsx';
import TriggerAlertsComponent from './components/TriggerAlertsComponent.jsx';

const App = () => {
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux

  return (
    <div className={`contaier mx-auto p-4 lg:p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <Navbar />

      {/* Main Grid: Current Weather and Map */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather and Detailed Summary */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg`}>
            <CurrentWeather />
            <WeatherDetails />
            <AdditionalInfo />
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg`}>
            <DetailedSummary />
          </div>
        </div>

        {/* Map Widget */}
        <div className="col-span-1">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg`}>
            <MapWidget />
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg mt-2`}>
            <AlertComponent />
          </div>
        </div>
      </div>

      {/* Forecast Section */}
      <div className="mt-10">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg`}>
          <Forecast />
        </div>
      </div>

      {/* History weather Section */}
      <div className="mt-10">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg p-6 shadow-lg`}>
          <HistoryWeather />
        </div>
      </div>

      <TriggerAlertsComponent/>
    </div>
  );
};

export default App;
