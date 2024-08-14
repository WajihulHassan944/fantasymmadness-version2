import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    profileUrl: '',
    // Add other user details if needed
  },
  reducers: {
    setUser: (state, action) => {
      const { id, firstName, lastName, email, profileUrl } = action.payload;
      state.id = id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.profileUrl = profileUrl;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.profileUrl = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
