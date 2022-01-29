import { dataCoupon } from './data-coupon';
import { UploadStatus, INITIAL_DISCOUNT } from '../../../constants';
import { DataCoupon } from '../../../types/state';

import {
  loadDiscount,
  loadCoupon,
  changeCouponStatus,
  clearCoupon
} from '../../actions';

const state: DataCoupon = {
  discount: INITIAL_DISCOUNT,
  coupon: null,
  couponStatus: UploadStatus.Unknown,
};

const stateWithData: DataCoupon = {
  discount: 15,
  coupon: 'light-333',
  couponStatus: UploadStatus.Completed,
};

describe('Reducer: dataCoupon', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataCoupon(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should change discount by given value', () => {
    expect(dataCoupon(state, loadDiscount(25)))
      .toEqual({ ...state, ...{ discount: 25 }});
  });

  it('should change coupon by given value', () => {
    expect(dataCoupon(state, loadCoupon('light-333')))
      .toEqual({ ...state, ...{ coupon: 'light-333' }});
  });

  it('should change coupon status by given value', () => {
    expect(dataCoupon(state, changeCouponStatus(UploadStatus.Completed)))
      .toEqual({ ...state, ...{ couponStatus: UploadStatus.Completed }});
  });

  it('should clear state', () => {
    expect(dataCoupon(stateWithData, clearCoupon))
      .toEqual(state);
  });

});
