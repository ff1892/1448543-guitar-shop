import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getFilterType = (state: State) => (
  state[StoreNameSpace.filter].filterType
);

export const getFilterStrings = (state: State) => (
  state[StoreNameSpace.filter].filterStrings
);

export const getFilterPrice = (state: State) => (
  state[StoreNameSpace.filter].filterPrice
);
