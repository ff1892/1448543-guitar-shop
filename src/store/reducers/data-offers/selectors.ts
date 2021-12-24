import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getAllOffers = (state: State) => (
  state[StoreNameSpace.offers].allOffers
);

export const getAllOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.offers].isAllOffersLoaded
);
