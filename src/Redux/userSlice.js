import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    playerName: '',
    zipCode: '',
    email: '',
    phone: '',
    isNotificationsEnabled: false,
    isSubscribed: false,
    isUSCitizen: false,
    isAgreed: false,
    profileUrl: '',
    currentPlan: 'None',
    freePlanExpiryDate: null,
    hasAvailedFreePlan: false,
    verified: false,
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload, // Spread the user data into the state
      };
    },
    clearUser: (state) => {
      return {
        id: null,
        firstName: '',
        lastName: '',
        playerName: '',
        zipCode: '',
        email: '',
        phone: '',
        isNotificationsEnabled: false,
        isSubscribed: false,
        isUSCitizen: false,
        isAgreed: false,
        profileUrl: '',
        currentPlan: 'None',
        freePlanExpiryDate: null,
        hasAvailedFreePlan: false,
        verified: false,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
