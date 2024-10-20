import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  city: Cookies.get('city') || 'Mumbai',
  country: "IN",
  temperature: 0,        
  latitude: 23.2599,       
  longitude: 77.4126,
  visibility: null,
  pressure: null,
  windSpeed: null,
  humidity: null,
  sunRise: null,
  sunSet: null,
  unit: 'C',
  showPopup: false,
  hourlyTemp: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
      Cookies.set('city', action.payload, { expires: 7 });  // Save city to cookie for 7 days
    },
    setCountry: (state, action)=>{
      state.country = action.payload
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },
    setVisibility: (state, action) =>{
      state.visibility = action.payload;
    },
    setPressure: (state, action) => {
      state.pressure = action.payload;
    },
    setWindSpeed: (state, action) => {
      state.windSpeed = action.payload;
    },
    setHumidity: (state, action) => {
      state.humidity = action.payload;
    },
    setSunRise: (state, action) => {
      state.sunRise = action.payload;
    },
    setSunSet: (state, action) => {
      state.sunSet = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
    setHourlyTemp: (state, action) => {
      state.hourlyTemp = action.payload;
    },
  },
});

export const { setCity, setLatitude, setLongitude,setTemperature, setVisibility, setPressure, setWindSpeed, setHumidity, setSunRise, setSunSet, setCountry, setUnit, setShowPopup, setHourlyTemp } = locationSlice.actions;
export default locationSlice.reducer;
