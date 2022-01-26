import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getOffersInCart = (state: State) => (
  state[StoreNameSpace.Cart].cartOffers
);
