// store.js
import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    matches: matchReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
