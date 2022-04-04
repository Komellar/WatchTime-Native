import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    genres: [],
    mostWatched: null,
  },
  reducers: {
    updateGenres(state, action) {
      const givenGenres = action.payload;
      let newGenresList = [];
      for (const [key, value] of Object.entries(givenGenres)) {
        newGenresList.push({ name: key, count: value });
      }
      state.genres = newGenresList;
    },
    resetGenres(state) {
      state.genres = [];
    },
    setMostWatched(state, action) {
      state.mostWatched = action.payload;
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice;
