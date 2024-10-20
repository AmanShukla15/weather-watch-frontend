import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import leaflet CSS

// Custom component to update map view when coordinates change
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center); // Update map center programmatically
    }
  }, [center, map]);
  return null;
};

const MapWidget = () => {
  const theme = useSelector((state) => state.theme.theme); // Get current theme from Redux
  const { city, latitude, longitude } = useSelector((state) => state.location); // Get city and coordinates from Redux

  const [mapCenter, setMapCenter] = useState([23.2599, 77.4126]); // Default coordinates for Mumbai

  // Update map center when latitude and longitude change
  useEffect(() => {
    if (latitude && longitude) {
      setMapCenter([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
      }`}
      style={{ zIndex: 1 }}
    >
      <h3 className="text-xl mb-4 font-bold">Location on Map</h3>
      <div className="h-64">
        {/* Conditionally render the map only when latitude and longitude are available */}
        {latitude && longitude ? (
          <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%',  zIndex: 1,}}>
            {/* Update map view when mapCenter changes */}
            <MapUpdater center={mapCenter} />

            {/* Tile Layer */}
            <TileLayer
              url={
                theme === 'dark'
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' // Dark mode map tiles
                  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // Light mode map tiles
              }
            />
            {/* Marker for city */}
            <Marker position={mapCenter}>
              <Popup>{city ? city : 'Mumbai'}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Loading map...</p> // Display message while coordinates are loading
        )}
      </div>
    </div>
  );
};

export default MapWidget;
