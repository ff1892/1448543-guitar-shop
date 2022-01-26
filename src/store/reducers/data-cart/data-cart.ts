import { createReducer } from '@reduxjs/toolkit';
import { DataCart } from '../../../types/state';
import { updateCartOffers } from '../../actions';
import { mockOffer, mockOffer2 } from '../../../mocks';
import { updateOffers, sortOffersById } from '../../../utils/common';

const initialState: DataCart = {
  cartOffers: sortOffersById([mockOffer, mockOffer2, mockOffer]),
};

export const dataCart = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCartOffers, (state, action) => {
      const updatedOffers = updateOffers(
        state.cartOffers,
        action.payload.offer,
        action.payload.count,
      );
      state.cartOffers = sortOffersById(updatedOffers);
    });
});
