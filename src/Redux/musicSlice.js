import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    isPlaying: true,
    seekPosition: 0, // Track the seek position
  },
  reducers: {
    stopMusic: (state, action) => {
      state.isPlaying = false;
      state.seekPosition = action.payload; // Save the seek position when stopping
    },
    playMusic: (state) => {
      state.isPlaying = true;
    },
    setSeekPosition: (state, action) => {
      state.seekPosition = action.payload; // Update seek position manually if needed
    },
  },
});

export const { stopMusic, playMusic, setSeekPosition } = musicSlice.actions;
export default musicSlice.reducer;
