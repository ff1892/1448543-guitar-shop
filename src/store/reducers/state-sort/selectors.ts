import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getSort = (state: State) => (
  state[StoreNameSpace.Sort].sort
);
