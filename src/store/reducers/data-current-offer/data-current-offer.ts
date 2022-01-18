import { createReducer } from '@reduxjs/toolkit';
import { DataCurrentOffer } from '../../../types/state';
import {
  loadCurrentOffer,
  loadCurrentOfferError
} from '../../actions';

const initialState: DataCurrentOffer = {
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
};

export const dataCurrentOffer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadCurrentOffer, (state, action) => {
      state.isCurrentOfferLoaded = false;
      state.isCurrentOfferError = false;
      state.currentOffer = action.payload;
      state.isCurrentOfferLoaded = true;
    })
    .addCase(loadCurrentOfferError, (state, _action) => {
      state.isCurrentOfferLoaded = true;
      state.isCurrentOfferError = true;
    });
});
