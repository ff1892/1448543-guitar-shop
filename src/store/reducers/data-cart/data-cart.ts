import { createReducer } from '@reduxjs/toolkit';
import { DataCart } from '../../../types/state';
// import { mockOffer, mockOffer2 } from '../../../mocks';

import {
  removeOffer,
  removeSameOffers,
  updateOffers
} from '../../../utils/common';

import {
  addCartOffer,
  removeCartOffer,
  removeSameCartOffers,
  updateCartOffers,
  clearCart
} from '../../actions';

const initialState: DataCart = {
  // cartOffers: [mockOffer, mockOffer2, mockOffer],
  cartOffers: [],
};

export const dataCart = createReducer(initialState, (builder) => {
  builder
    .addCase(addCartOffer, (state, action) => {
      state.cartOffers = [...state.cartOffers, action.payload];
    })
    .addCase(removeCartOffer, (state, action) => {
      state.cartOffers = removeOffer(state.cartOffers, action.payload);
    })
    .addCase(removeSameCartOffers, (state, action) => {
      state.cartOffers = removeSameOffers(state.cartOffers, action.payload);
    })
    .addCase(updateCartOffers, (state, action) => {
      state.cartOffers = updateOffers(
        state.cartOffers,
        action.payload.offer,
        action.payload.count,
      );
    })
    .addCase(clearCart, (state, _action) => {
      state.cartOffers = [];
    });
});
