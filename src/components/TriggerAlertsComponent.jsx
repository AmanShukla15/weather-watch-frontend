import { useEffect, useState } from 'react';
import { fetchtriggerAlerts } from '../api/alertApi';
import AlertPopup from './AlertPopup.jsx'; // Assuming AlertPopup is in the same folder
import { useDispatch, useSelector } from 'react-redux';
import { setShowPopup } from '../redux/locationSlice.js';

const TriggerAlertsComponent = () => {
    const dispatch = useDispatch()
    const [triggeredAlerts, setTriggeredAlerts] = useState([]);
    const [error, setError] = useState(null);
    const { showPopup } = useSelector((state) => state.location);

    useEffect(() => {
        const triggerAlerts = async () => {
            try {
                const response = await fetchtriggerAlerts();
                if (response.triggeredAlerts?.length > 0) {
                    setTriggeredAlerts(response.triggeredAlerts);
                    dispatch(setShowPopup(true)); // Show popup when alerts are triggered
                }
            } catch (err) {
                setError('Failed to trigger alerts');
            }
        };
        
        // Call the API every 5 minutes
        const intervalId = setInterval(triggerAlerts, 3000000); // 5 minutes in ms

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}

            {/* Conditionally show the popup */}
            {showPopup && (
                <AlertPopup
                    triggeredAlerts={triggeredAlerts}
                />
            )}
        </div>
    );
};

export default TriggerAlertsComponent;
