import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import authReducer from './authSlice'; // Import the auth reducer
import userReducer from './userSlice'; // Import the user reducer

const store = configureStore({
  reducer: {
    matches: matchReducer,
    auth: authReducer, // Add auth reducer here
    user: userReducer, // Add user reducer here
  },
});

export default store;
