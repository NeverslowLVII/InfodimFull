import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../authSlice'; // Import the auth reducer

const rootReducer = combineReducers({
  auth: authReducer, // Add the auth reducer to the rootReducer
});

export default rootReducer;
