import { configureStore } from '@reduxjs/toolkit';
import matchReducer from './matchSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import adminAuthReducer from './adminAuthSlice';
import affiliateAuthReducer from './affiliateAuthSlice';  // Updated to affiliateAuthReducer

const store = configureStore({
  reducer: {
    matches: matchReducer,
    auth: authReducer,
    user: userReducer,
    adminAuth: adminAuthReducer,
    affiliateAuth: affiliateAuthReducer,
  },
});

export default store;
