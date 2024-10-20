import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import themeReducer from './themeSlice';


const store = configureStore({
  reducer: {
    location: locationReducer,
    theme: themeReducer,
  },
});

export default store;
