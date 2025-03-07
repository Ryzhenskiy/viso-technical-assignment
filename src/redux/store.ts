import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './slices/favouritesSlice';

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
