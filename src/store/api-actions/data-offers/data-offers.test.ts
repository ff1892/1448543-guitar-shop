import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { ApiRoute, QueryRoute, TOTAL_COUNT_HEADER } from '../../../constants';
import { makeFakeGuitars, makeFakeGuitarsNoComments } from '../../../utils/mocks';


import {
  fetchAllOffersAction,
  fetchPriceOffersAction,
  fetchSimiliarOffersAction
} from './data-offers';

import {
  loadTotalCount,
  loadAllOffers,
  loadAllOffersError,
  loadPriceOffers,
  loadPriceOffersError,
  loadSimiliarOffers,
  loadSimiliarOffersError
} from '../../actions';


const fakeGuitars = makeFakeGuitars();
const fakeGuitarsNoComments = makeFakeGuitarsNoComments();
const totalCount = fakeGuitars.length;

const api = createApi();
const mockApi = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('Api actions: data all offers', () => {

  it('should dispatch loadAllOffers and loadTotalCount when GET /guitars', async () => {
    mockApi
      .onGet(`${ApiRoute.Guitars}?`)
      .reply(200, fakeGuitars, { [TOTAL_COUNT_HEADER]: totalCount });

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchAllOffersAction('', false));
    expect(store.getActions()).toEqual([
      loadAllOffers(fakeGuitars),
      loadTotalCount(totalCount),
    ]);
  });

  it('should dispatch loadAllOffersError when can not GET /guitars', async () => {
    mockApi
      .onGet('/fakeRoute')
      .reply(404, []);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchAllOffersAction('/fakeRoute', false));
    expect(store.getActions()).toEqual([
      loadAllOffersError(),
    ]);
  });
});

describe('Api actions: data price offers', () => {
  it('should dispatch loadPriceOffers when GET /guitars', async () => {
    mockApi
      .onGet(`${ApiRoute.Guitars}?`)
      .reply(200, fakeGuitars);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPriceOffersAction(''));
    expect(store.getActions()).toEqual([
      loadPriceOffers(fakeGuitars),
    ]);
  });

  it('should dispatch loadAllOffersError when can not GET /guitars', async () => {
    mockApi
      .onGet(`${ApiRoute.Guitars}/fakeRoute`)
      .reply(404, []);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPriceOffersAction('/fakeRoute'));
    expect(store.getActions()).toEqual([
      loadPriceOffersError(),
    ]);
  });
});

describe('Api actions: data similiar offers', () => {
  it('should dispatch loadSimiliarOffers when GET /guitars', async () => {
    mockApi
      .onGet(`${ApiRoute.Guitars}?${QueryRoute.Similiar}`)
      .reply(200, fakeGuitarsNoComments);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimiliarOffersAction(''));
    expect(store.getActions()).toEqual([
      loadSimiliarOffers(fakeGuitarsNoComments),
    ]);
  });

  it('should dispatch loadSimiliarOffersError when can not GET /guitars', async () => {
    mockApi
      .onGet(`${ApiRoute.Guitars}/fakeRoute`)
      .reply(404, []);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimiliarOffersAction('/fakeRoute'));
    expect(store.getActions()).toEqual([
      loadSimiliarOffersError(),
    ]);
  });
});
