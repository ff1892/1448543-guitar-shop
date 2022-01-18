import { combineReducers } from 'redux';
import { dataOffers } from './data-offers/data-offers';
import { stateFilter } from './state-filter/state-filter';
import { stateSort } from './state-sort/state-sort';
import { statePage } from './state-page/state-page';
import { dataCurrentOffer } from './data-current-offer/data-current-offer';

export enum StoreNameSpace {
  Offers = 'DATA_OFFERS',
  Filter = 'STATE_FILTER',
  Sort = 'STATE_SORT',
  Page = 'STATE_PAGE',
  CurrentOffer = 'DATA_CURRENT_OFFER',
}

export const rootReducer = combineReducers({
  [StoreNameSpace.Offers]: dataOffers,
  [StoreNameSpace.Filter]: stateFilter,
  [StoreNameSpace.Sort]: stateSort,
  [StoreNameSpace.Page]: statePage,
  [StoreNameSpace.CurrentOffer]: dataCurrentOffer,
});

export type RootState = ReturnType<typeof rootReducer>;
