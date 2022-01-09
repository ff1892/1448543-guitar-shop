import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getTotalCount = (state: State) => (
  state[StoreNameSpace.Offers].totalCount
);

export const getAllOffers = (state: State) => (
  state[StoreNameSpace.Offers].allOffers
);

export const getAllOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.Offers].isAllOffersLoaded
);

export const getAllOffersError = (state: State) => (
  state[StoreNameSpace.Offers].isAllOffersError
);

export const getPriceOffers = (state: State) => (
  state[StoreNameSpace.Offers].priceOffers
);

export const getPriceOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.Offers].isPriceOffersLoaded
);

export const getPriceOffersError = (state: State) => (
  state[StoreNameSpace.Offers].isPriceOffersError
);

export const getSimiliarOffers = (state: State) => (
  state[StoreNameSpace.Offers].similiarOffers
);

export const getSimiliarOffersIsLoaded = (state: State) => (
  state[StoreNameSpace.Offers].isSimiliarOffersLoaded
);

export const getSimiliarOffersError = (state: State) => (
  state[StoreNameSpace.Offers].isSimiliarOffersError
);
