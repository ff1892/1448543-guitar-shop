import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  LoadTotalCount = 'data/LoadTotalCount',
  LoadAllOffers = 'data/LoadAllOffers',
  LoadAllOffersError = 'data/LoadAllOffersError',
  LoadPriceOffers = 'data/LoadPriceOffers',
  LoadPriceOffersError = 'data/LoadPriceOffersError',
  LoadSimiliarOffers = 'data/LoadSimiliarOffers',
  LoadSimiliarOffersError = 'data/LoadSimiliarOffersError',
  ChangeSort = 'state/ChangeSort',
  ChangeFilterType = 'state/ChangeFilterType',
  ChangeFilterStrings = 'state/ChangeFilterStrings',
  ChangeFilterPrice = 'state/ChangeFilterPrice',
  ChangePage = 'state/ChangePage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
