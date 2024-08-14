// matchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch data from the API using fetch
export const fetchMatches = createAsyncThunk('matches/fetchMatches', async () => {
  const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/match');
  const data = await response.json();
  return data;
});

const matchSlice = createSlice({
  name: 'matches',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default matchSlice.reducer;
