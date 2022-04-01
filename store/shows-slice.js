import { createSlice } from '@reduxjs/toolkit';

const showsSlice = createSlice({
  name: 'show',
  initialState: {
    showsList: [],
    showsIdList: [],
    favShowsList: [],
    favShowsIdList: [],
    // startedShowsList: [],
    // startedShowsIdList: [],
    // endedShowsList: [],
    // endedShowsIdList: []
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
          watchStatus: 'notStarted',
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
      let newShowsList = [];
      action.payload.showsList.forEach((show) => {
        newShowsList.push({
          id: show.id,
          title: show.title,
          image: show.image,
          watchStatus: show.watchStatus,
        });
      });
      state.showsList = newShowsList;
      state.showsIdList = action.payload.idList;
    },
    //
    // Favourite
    //
    addToFav(state, action) {
      const newShow = action.payload;
      const existingShow = state.favShowsList.find(
        (show) => show.id === newShow.id
      );

      // if show isn't in favShowsList, add it there
      if (!existingShow) {
        state.favShowsList.push({
          id: newShow.id,
          title: newShow.title,
          image: newShow.image,
        });
        state.favShowsIdList.push(newShow.id);
      }
    },
    removeFromFavList(state, action) {
      const myShow = action.payload;
      const existingShow = state.favShowsList.find(
        (show) => show.id === myShow.id
      );

      // if show is in favShowsList, remove it
      if (existingShow) {
        state.favShowsList = state.favShowsList.filter(
          (show) => show.id !== myShow.id
        );
        state.favShowsIdList = state.favShowsIdList.filter(
          (showId) => showId !== myShow.id
        );
      }
    },
    updateFavList(state, action) {
      state.favShowsList = action.payload.showList;
      state.favShowsIdList = action.payload.idList;
    },
  },
});

export const showsActions = showsSlice.actions;

export default showsSlice;
