import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  LoadAllOffers = 'data/LoadAllOffers',
  LoadAllOffersError = 'data/LoadAllOffersError',
  LoadPriceOffers = 'data/LoadPriceOffers',
  LoadPriceOffersError = 'data/LoadPriceOffersError',
  LoadSimiliarOffers = 'data/LoadSimiliarOffers',
  LoadSimiliarOffersError = 'data/LoadSimiliarOffersError',
  ChangeSort = 'data/ChangeSort',
  ChangeFilterType = 'state/ChangeFilterType',
  ChangeFilterStrings = 'state/ChangeFilterStrings',
  ChangeFilterPrice = 'state/ChangeFilterPrice',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
