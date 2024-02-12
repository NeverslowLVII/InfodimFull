import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    isEnabled: localStorage.getItem('darkMode') === 'true',
  },
  reducers: {
    toggleDarkMode: (state) => {
      const newIsEnabled = !state.isEnabled;
      state.isEnabled = newIsEnabled;
      localStorage.setItem('darkMode', newIsEnabled.toString());
      if (newIsEnabled) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;