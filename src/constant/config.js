export const server = import.meta.env.VITE_SERVER_URI;

// Function to format sunrise/sunset time
export const formatTime = (dateTimeString) => {
  // Split the string by comma and take the time part (index 1)
  const timePart = dateTimeString.split(',')[1].trim(); // "6:34:10 am"

  // Further split by space to get rid of am/pm and by colon to get hours and minutes
  const [hours, minutes] = timePart.split(':');

  return `${hours}:${minutes}`; // Return only the hours and minutes
};

export const convertToFahrenheit = (tempC) => {
  return ((tempC * 9) / 5 + 32).toFixed(1);
};
