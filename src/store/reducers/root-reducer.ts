import { combineReducers } from 'redux';
import { dataOffers } from './data-offers/data-offers';

export enum StoreNameSpace {
  offers = 'DATA_OFFERS',
}

export const rootReducer = combineReducers({
  [StoreNameSpace.offers]: dataOffers,
});

export type RootState = ReturnType<typeof rootReducer>;
