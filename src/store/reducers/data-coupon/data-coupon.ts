import { createReducer } from '@reduxjs/toolkit';
import { DataCoupon } from '../../../types/state';
import { UploadStatus } from '../../../constants';


import {
  loadDiscount,
  loadCoupon,
  changeCouponStatus,
  clearCoupon
} from '../../actions';

const initialState: DataCoupon = {
  discount: 0,
  coupon: null,
  couponStatus: UploadStatus.Unknown,
};

export const dataCoupon = createReducer(initialState, (builder) => {
  builder
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    })
    .addCase(loadCoupon, (state, action) => {
      state.coupon = action.payload;
    })
    .addCase(changeCouponStatus, (state, action) => {
      state.couponStatus = action.payload;
    })
    .addCase(clearCoupon, (state, _action) => {
      state.discount = 0;
      state.coupon = null;
      state.couponStatus = UploadStatus.Unknown;
    });
});
