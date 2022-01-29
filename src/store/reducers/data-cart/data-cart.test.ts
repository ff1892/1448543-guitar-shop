import { dataCart } from './data-cart';
import { DataCart } from '../../../types/state';
import { makeFakeGuitar } from '../../../utils/mocks';


import {
  addCartOffer,
  removeCartOffer,
  removeSameCartOffers,
  updateCartOffers,
  clearCart
} from '../../actions';

const fakeOffer = makeFakeGuitar();

const initialState: DataCart = {
  cartOffers: [],
};

const state: DataCart = {
  cartOffers: [fakeOffer, fakeOffer],
};

describe('Reducer: dataCart', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataCart(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(initialState);
  });
  it('should increase offers when add offer', () => {
    expect(dataCart(state, addCartOffer(fakeOffer)).cartOffers)
      .toHaveLength(3);
  });

  it('should decrease offers when remove offer', () => {
    expect(dataCart(state, removeCartOffer(fakeOffer)).cartOffers)
      .toHaveLength(1);
  });

  it('should delete offers when remove same offers', () => {
    expect(dataCart(state, removeSameCartOffers(fakeOffer)).cartOffers)
      .toHaveLength(0);
  });
  it('should update offers whith given value', () => {
    expect(dataCart(state, updateCartOffers(fakeOffer, 10)).cartOffers)
      .toHaveLength(10);
  });

  it('should clear cart', () => {
    expect(dataCart(state, clearCart).cartOffers)
      .toHaveLength(0);
  });
});
