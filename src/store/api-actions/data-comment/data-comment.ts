import { ApiRoute, UploadStatus } from '../../../constants';
import { changeCommentStatus } from '../../actions';
import { ThunkActionResult } from '../../../types/action';
import { CommentPost } from '../../../types/data';

export const commentPostAction = (comment: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(changeCommentStatus(UploadStatus.Posting));
    try {
      await api.post(ApiRoute.Comments, comment);
      dispatch(changeCommentStatus(UploadStatus.Completed));
    } catch {
      dispatch(changeCommentStatus(UploadStatus.Error));
    }
  };
