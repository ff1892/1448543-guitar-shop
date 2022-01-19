import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getCommentStatus = (state: State) => (
  state[StoreNameSpace.Comment].commentStatus
);
