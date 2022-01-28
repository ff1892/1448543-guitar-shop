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
  LoadSimiliarOffersSearch = 'data/LoadSimiliarOffersSearch',
  LoadSimiliarOffersError = 'data/LoadSimiliarOffersError',
  ChangeSort = 'state/ChangeSort',
  ChangeFilterType = 'state/ChangeFilterType',
  ChangeFilterStrings = 'state/ChangeFilterStrings',
  ChangeFilterPrice = 'state/ChangeFilterPrice',
  ChangePage = 'state/ChangePage',
  LoadCurrentOffer = 'data/LoadCurrentOffer',
  LoadCurrentOfferError = 'data/LoadCurrentOfferError',
  ChangeUploadCommentStatus = 'data/ChangeUploadCommentStatus',
  AddCartOffer = 'data/AddCartOffer',
  RemoveCartOffer = 'data/RemoveCartOffer',
  RemoveSameCartOffers = 'data/RemoveSameCartOffers',
  UpdateCartOffers = 'data/UpdateCartOffers',
  ClearCart = 'data/ClearCart',
  LoadDiscount = 'data/LoadDiscount',
  LoadCoupon= 'data/LoadCoupon',
  ChangeCouponStatus = 'data/ChangeCouponStatus',
  ClearCoupon = 'data/ClearCoupon'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
