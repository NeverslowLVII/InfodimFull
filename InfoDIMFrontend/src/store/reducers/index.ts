import { combineReducers } from '@reduxjs/toolkit';
import darkModeReducer from '../darkModeSlice'; // Import the dark mode reducer
import authReducer from '../authSlice'; // Import the auth reducer

const rootReducer = combineReducers({
  darkMode: darkModeReducer, // Add the dark mode reducer to the rootReducer
  auth: authReducer, // Add the auth reducer to the rootReducer
});

export default rootReducer;
