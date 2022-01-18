import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getCurrentOffer = (state: State) => (
  state[StoreNameSpace.CurrentOffer].currentOffer
);

export const getIsCurrentOfferLoaded = (state: State) => (
  state[StoreNameSpace.CurrentOffer].isCurrentOfferLoaded
);

export const getIsCurrentOfferError = (state: State) => (
  state[StoreNameSpace.CurrentOffer].isCurrentOfferError
);
