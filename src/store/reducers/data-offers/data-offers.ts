import { createReducer } from '@reduxjs/toolkit';
import { DataOffers } from '../../../types/state';
import {
  loadAllOffers,
  loadAllOffersError,
  loadPriceOffers,
  loadPriceOffersError
} from '../../actions';

const initialState: DataOffers = {
  allOffers: [],
  isAllOffersLoaded: false,
  isAllOffersError: false,
  priceOffers: [],
  isPriceOffersLoaded: false,
  isPriceOffersError: false,
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
    })
    .addCase(loadPriceOffers, (state, action) => {
      state.isPriceOffersError = false;
      state.priceOffers = action.payload;
      state.isPriceOffersLoaded = true;
    })
    .addCase(loadPriceOffersError, (state, _action) => {
      state.isPriceOffersError = true;
    });
});
