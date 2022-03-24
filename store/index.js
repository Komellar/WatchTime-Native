import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import showsSlice from './shows-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shows: showsSlice.reducer,
  },
});

export default store;
