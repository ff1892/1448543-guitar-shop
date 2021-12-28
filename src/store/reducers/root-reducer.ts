import { combineReducers } from 'redux';
import { dataOffers } from './data-offers/data-offers';
import { stateFilter } from './state-filter/state-filter';
import { stateSort } from './state-sort/state-sort';

export enum StoreNameSpace {
  offers = 'DATA_OFFERS',
  filter = 'STATE_FILTER',
  sort = 'STATE_SORT',
}

export const rootReducer = combineReducers({
  [StoreNameSpace.offers]: dataOffers,
  [StoreNameSpace.filter]: stateFilter,
  [StoreNameSpace.sort]: stateSort,
});

export type RootState = ReturnType<typeof rootReducer>;
