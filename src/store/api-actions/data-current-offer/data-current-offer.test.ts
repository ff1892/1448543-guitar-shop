import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { ApiRoute, QueryRoute } from '../../../constants';
import { fetchCurrentOfferAction } from './data-current-offer';
import { loadCurrentOffer, loadCurrentOfferError } from '../../actions';
import { makeFakeGuitar } from '../../../utils/mocks';


const fakeGuitar = makeFakeGuitar();
const fakeId = fakeGuitar.id;
const fakeQuery = `${ApiRoute.Guitars}/${fakeId}?${QueryRoute.CommentsEmbed}`;


describe('Api actions: data-current-offer', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadCurrentOffer when GET /guitar', async () => {
    mockApi
      .onGet(fakeQuery)
      .reply(200, fakeGuitar);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentOfferAction(fakeId.toString()));
    expect(store.getActions()).toEqual([
      loadCurrentOffer(fakeGuitar),
    ]);
  });

  it('should dispatch loadCurrentOfferError when cannot GET /guitar', async () => {
    mockApi
      .onGet(fakeQuery)
      .reply(404, fakeGuitar);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCurrentOfferAction(fakeId.toString()));
    expect(store.getActions()).toEqual([
      loadCurrentOfferError(),
    ]);
  });
});
