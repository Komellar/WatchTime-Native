import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    genres: {},
  },
  reducers: {
    updateGenres(state, action) {
      //   const givenGenres = action.payload;
      //   let newGenresList = [];
      //   for (const [key, value] of Object.entries(givenGenres)) {
      //     newGenresList.push({ [key]: value });
      //     console.log(`${key}: ${value}`);
      //   }
      state.genres = action.payload;
    },
    resetGenres(state) {
      state.genres = [];
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice;
