import { createReducer } from '@reduxjs/toolkit';
import { DataOffers } from '../../../types/state';
import { loadAllOffers, loadAllOffersError } from '../../actions';

const initialState: DataOffers = {
  allOffers: [],
  isAllOffersLoaded: false,
  isAllOffersError: false,
};

export const dataOffers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllOffers, (state, action) => {
      state.isAllOffersError = false;
      state.allOffers = action.payload;
      state.isAllOffersLoaded = true;
    })
    .addCase(loadAllOffersError, (state, _action) => {
      state.isAllOffersError = true;
    });
});
