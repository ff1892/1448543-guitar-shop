import { Guitar, GuitarNoComments } from './data';
import { Sort, FilterPrice } from './components';
import { RootState } from '../store/reducers/root-reducer';

export type DataOffers = {
  allOffers: Guitar[],
  isAllOffersLoaded: boolean,
  isAllOffersError: boolean,
  priceOffers: Guitar[],
  isPriceOffersLoaded: boolean,
  isPriceOffersError: boolean,
  similiarOffers: GuitarNoComments[],
  isSimiliarOffersLoaded: boolean,
  isSimiliarOffersError: boolean,
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
