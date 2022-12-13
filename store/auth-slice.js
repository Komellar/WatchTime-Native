import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: undefined,
    userName: null,
    userId: null,
    userImg: null,
    isPremium: undefined,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn ?? true;
      state.userName = action.payload.displayName;
      state.userId = action.payload.uid;
      state.userImg = action.payload.userImg;
      state.isPremium = action.payload.isPremium;
    },
    removeCurrentUser(state) {
      state.isLoggedIn = false;
      state.userName = null;
      state.userId = null;
      state.userImg = null;
    },
    updateToPremium(state) {
      state.isPremium = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
