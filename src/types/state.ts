import { Guitar } from './data';
import { RootState } from '../store/reducers/root-reducer';

export type DataOffers = {
  allOffers: Guitar[],
  isAllOffersLoaded: boolean,
};

export type State = RootState;
