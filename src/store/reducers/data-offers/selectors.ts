import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getTotalCount = (state: State) => (
  state[StoreNameSpace.offers].totalCount
);

export const getAllOffers = (state: State) => (
  state[StoreNameSpace.offers].allOffers
);

export const getAllOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.offers].isAllOffersLoaded
);

export const getAllOffersError = (state: State) => (
  state[StoreNameSpace.offers].isAllOffersError
);

export const getPriceOffers = (state: State) => (
  state[StoreNameSpace.offers].priceOffers
);

export const getPriceOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.offers].isPriceOffersLoaded
);

export const getPriceOffersError = (state: State) => (
  state[StoreNameSpace.offers].isPriceOffersError
);

export const getSimiliarOffers = (state: State) => (
  state[StoreNameSpace.offers].similiarOffers
);

export const getSimiliarOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.offers].isSimiliarOffersLoaded
);

export const getSimiliarOffersError = (state: State) => (
  state[StoreNameSpace.offers].isSimiliarOffersError
);
