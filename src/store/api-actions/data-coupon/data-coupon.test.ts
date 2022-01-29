import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { ApiRoute, UploadStatus } from '../../../constants';
import { couponPostAction } from './data-coupon';

import {
  changeCouponStatus,
  loadCoupon,
  loadDiscount
} from '../../actions';

const fakeCoupon = 'fake-coupon';
const fakeDiscount = 20;


describe('Api actions: data-coupon', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should change coupon status, load discount, load coupon when success POST /comments', async () => {
    mockApi
      .onPost(ApiRoute.Coupons)
      .reply(200, fakeDiscount );

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(couponPostAction(fakeCoupon));
    expect(store.getActions()).toEqual([
      changeCouponStatus(UploadStatus.Posting),
      loadDiscount(fakeDiscount),
      changeCouponStatus(UploadStatus.Completed),
      loadCoupon(fakeCoupon),
    ]);
  });

  it('should change loading status when error POST /comments', async () => {
    mockApi
      .onPost(ApiRoute.Coupons)
      .reply(400);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(couponPostAction(fakeCoupon));
    expect(store.getActions()).toEqual([
      changeCouponStatus(UploadStatus.Posting),
      changeCouponStatus(UploadStatus.Error),
    ]);
  });
});
