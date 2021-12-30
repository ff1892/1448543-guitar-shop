import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getPage = (state: State) => (
  state[StoreNameSpace.page].page
);
