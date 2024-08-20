// store.js
import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import adminAuthReducer from './adminAuthSlice'; // Import adminAuthReducer

const store = configureStore({
  reducer: {
    matches: matchReducer,
    auth: authReducer,
    user: userReducer,
    adminAuth: adminAuthReducer, // Add adminAuth reducer
  },
});

export default store;
