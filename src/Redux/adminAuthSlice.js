import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for logging in the admin
export const loginAdmin = createAsyncThunk('adminAuth/loginAdmin', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Admin login failed');
    }

    // Return the token
    return {
      token: data.token,
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    isAdminAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.isAdminAuthenticated = false;
      localStorage.removeItem('adminAuthToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdminAuthenticated = true;
        localStorage.setItem('adminAuthToken', action.payload.token); // Store token in local storage
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
