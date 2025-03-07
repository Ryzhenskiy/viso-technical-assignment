import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '../../types/meal';

const getInitialFavouritesProducts = () => {
  if (typeof localStorage !== 'undefined') {
    const savedFavouritesProducts = localStorage.getItem('favouritesProducts');
    return savedFavouritesProducts ? JSON.parse(savedFavouritesProducts) : [];
  }
  return [];
};

interface favouritesState {
  favourites: Meal[];
}

const initialState: favouritesState = {
  favourites: getInitialFavouritesProducts(),
};

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<Meal>) => {
      if (
        !state.favourites.some((meal) => meal.idMeal === action.payload.idMeal)
      ) {
        state.favourites.push(action.payload);
      }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'favouritesProducts',
          JSON.stringify(state.favourites)
        );
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(
        (meal) => meal.idMeal !== action.payload
      );
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'favouritesProducts',
          JSON.stringify(state.favourites)
        );
      }
    },
    clearFavourites: (state) => {
      state.favourites = [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          'favouritesProducts',
          JSON.stringify(state.favourites)
        );
      }
    },
  },
});

export const { addFavourite, removeFavourite, clearFavourites } =
  favouritesSlice.actions;
export default favouritesSlice.reducer;
