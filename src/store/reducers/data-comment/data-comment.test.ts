import { UploadStatus } from '../../../constants';
import { DataComment } from '../../../types/state';
import { changeCommentStatus } from '../../actions';
import { dataComment } from './data-comment';
import { datatype } from 'faker';

const state: DataComment = {
  commentStatus: UploadStatus.Unknown,
};

describe('Reducer: dataComment', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataComment(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should change comment status by given value', () => {
    const newStatus = datatype.string();
    expect(dataComment(state, changeCommentStatus(newStatus)))
      .toEqual({ commentStatus: newStatus });
  });
});
