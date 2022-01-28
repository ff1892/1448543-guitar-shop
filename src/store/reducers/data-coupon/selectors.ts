import { State } from '../../../types/state';
import { StoreNameSpace } from '../root-reducer';

export const getDiscount = (state: State) => (
  state[StoreNameSpace.Coupon].discount
);

export const getCoupon = (state: State) => (
  state[StoreNameSpace.Coupon].coupon
);

export const getCouponStatus = (state: State) => (
  state[StoreNameSpace.Coupon].couponStatus
);

