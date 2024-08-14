import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import authReducer from './authSlice'; // Import the auth reducer

const store = configureStore({
  reducer: {
    matches: matchReducer,
    auth: authReducer, // Add auth reducer here
  },
});

export default store;
