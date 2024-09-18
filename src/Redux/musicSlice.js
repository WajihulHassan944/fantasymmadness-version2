// Redux/musicSlice.js
import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    isPlaying: true,
  },
  reducers: {
    stopMusic: (state) => {
      state.isPlaying = false;
    },
    playMusic: (state) => {
      state.isPlaying = true;
    },
  },
});

export const { stopMusic, playMusic } = musicSlice.actions;
export default musicSlice.reducer;
