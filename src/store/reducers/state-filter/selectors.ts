import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getFilterType = (state: State) => (
  state[StoreNameSpace.Filter].filterType
);

export const getFilterStrings = (state: State) => (
  state[StoreNameSpace.Filter].filterStrings
);

export const getFilterPrice = (state: State) => (
  state[StoreNameSpace.Filter].filterPrice
);
