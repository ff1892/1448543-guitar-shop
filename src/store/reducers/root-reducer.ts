import { combineReducers } from 'redux';
import { dataOffers } from './data-offers/data-offers';
import { stateFilter } from './state-filter/state-filter';
import { stateSort } from './state-sort/state-sort';
import { statePage } from './state-page/state-page';

export enum StoreNameSpace {
  Offers = 'DATA_OFFERS',
  Filter = 'STATE_FILTER',
  Sort = 'STATE_SORT',
  Page = 'STATE_PAGE',
}

export const rootReducer = combineReducers({
  [StoreNameSpace.Offers]: dataOffers,
  [StoreNameSpace.Filter]: stateFilter,
  [StoreNameSpace.Sort]: stateSort,
  [StoreNameSpace.Page]: statePage,
});

export type RootState = ReturnType<typeof rootReducer>;
