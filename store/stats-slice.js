import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    genres: [],
  },
  reducers: {
    updateGenres(state, action) {
      const givenGenres = action.payload;
      let newGenresList = [];
      for (const [key, value] of Object.entries(givenGenres)) {
        // if (value === 0) {
        //   continue;
        // }
        newGenresList.push({ name: key, count: value });
        // console.log(`${key}: ${value}`);
      }
      state.genres = newGenresList;
      // const sortedGenres = objs.sort((a, b) =>
      // a.last_nom.localeCompare(b.last_nom)
      // );
    },
    resetGenres(state) {
      state.genres = [];
    },
  },
});

export const statsActions = statsSlice.actions;

export default statsSlice;
