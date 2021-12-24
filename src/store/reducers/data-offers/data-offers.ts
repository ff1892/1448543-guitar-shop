import { createReducer } from '@reduxjs/toolkit';
import { DataOffers } from '../../../types/state';
import { loadAllOffers } from '../../actions';

const initialState: DataOffers = {
  allOffers: [],
  isAllOffersLoaded: false,
};

export const dataOffers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllOffers, (state, action) => {
      state.allOffers = action.payload;
      state.isAllOffersLoaded = true;
    });
});
