import { createSlice } from '@reduxjs/toolkit';

const showsSlice = createSlice({
  name: 'show',
  initialState: {
    showsList: [],
    showsIdList: [],
  },
  reducers: {
    addToList(state, action) {
      const newShow = action.payload;
      const existingShow = state.showsList.find(
        (show) => show.id === newShow.id
      );

      // if show isn't in showsList, add it there
      if (!existingShow) {
        state.showsList.push({
          id: newShow.id,
          title: newShow.title,
          image: newShow.image,
        });

        state.showsIdList.push(newShow.id);
      }
    },
    removeFromList(state, action) {
      const myShow = action.payload;
      const existingShow = state.showsList.find(
        (show) => show.id === myShow.id
      );

      // if show is in showsList, remove it
      if (existingShow) {
        state.showsList = state.showsList.filter(
          (show) => show.id !== myShow.id
        );

        state.showsIdList = state.showsIdList.filter(
          (showId) => showId !== myShow.id
        );
      }
    },
    resetList(state) {
      state.showsList = [];
      state.showsIdList = [];
      state.favShowsList = [];
      state.favShowsIdList = [];
    },
    updateList(state, action) {
      state.showsList = action.payload.showList;
      state.showsIdList = action.payload.idList;
    },
  },
});

export const showsActions = showsSlice.actions;

export default showsSlice;
