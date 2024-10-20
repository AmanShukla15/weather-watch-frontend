import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // Default to dark mode
  isLoading: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'; // Toggle between dark and light modes
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
  },
});

export const { toggleTheme, setIsLoading} = themeSlice.actions;
export default themeSlice.reducer;
