<<<<<<< Updated upstream:InfoDIMFrontend/src/redux/reducers.ts
import { combineReducers } from "redux";

import Auth from "./auth/reducers";
import Layout from "./layout/reducers";

export default combineReducers({
  Auth,
  Layout,
});

=======

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other slice reducers here
});

export default rootReducer;
>>>>>>> Stashed changes:InfoDIMFrontend/src/store/reducers.ts
