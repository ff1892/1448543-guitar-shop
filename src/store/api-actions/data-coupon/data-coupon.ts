import { ApiRoute, UploadStatus } from '../../../constants';
import {
  loadDiscount,
  loadCoupon,
  changeCouponStatus
} from '../../actions';
import { Coupon } from '../../../types/data';
import { ThunkActionResult } from '../../../types/action';

export const couponPostAction = (coupon: Coupon): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(changeCouponStatus(UploadStatus.Posting));
    try {
      await api.post(ApiRoute.Coupons, { coupon })
        .then(({ data }) => dispatch(loadDiscount(data)));
      dispatch(changeCouponStatus(UploadStatus.Completed));
      dispatch(loadCoupon(coupon));
    } catch {
      dispatch(changeCouponStatus(UploadStatus.Error));
    }
  };
