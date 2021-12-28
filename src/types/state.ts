import { Guitar } from './data';
import { Sort, FilterPrice } from './components';
import { RootState } from '../store/reducers/root-reducer';

export type DataOffers = {
  allOffers: Guitar[],
  isAllOffersLoaded: boolean,
  isAllOffersError: boolean,
  priceOffers: Guitar[],
  isPriceOffersLoaded: boolean,
  isPriceOffersError: boolean,
};

export type StateSort = {
  sort: Sort,
};

export type StateFilter = {
  filterType: string[],
  filterStrings: string[],
  filterPrice: FilterPrice,
};

export type State = RootState;
