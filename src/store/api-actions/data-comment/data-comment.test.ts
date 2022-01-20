import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { ApiRoute, UploadStatus } from '../../../constants';
import { commentPostAction } from './data-comment';
import { changeCommentStatus } from '../../actions';
import { makeFakeCommentPost } from '../../../utils/mocks';


const fakeComment = makeFakeCommentPost();

describe('Api actions: data-comment', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should change loading status when success POST /comments', async () => {
    mockApi
      .onPost(ApiRoute.Comments)
      .reply(200);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(commentPostAction(fakeComment));
    expect(store.getActions()).toEqual([
      changeCommentStatus(UploadStatus.Posting),
      changeCommentStatus(UploadStatus.Completed),
    ]);
  });

  it('should change loading status when error POST /comments', async () => {
    mockApi
      .onPost(ApiRoute.Comments)
      .reply(400);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(commentPostAction(fakeComment));
    expect(store.getActions()).toEqual([
      changeCommentStatus(UploadStatus.Posting),
      changeCommentStatus(UploadStatus.Error),
    ]);
  });
});
