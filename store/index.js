import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import showsSlice from './shows-slice';
import statsSlice from './stats-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    shows: showsSlice.reducer,
    stats: statsSlice.reducer,
  },
});

export default store;
