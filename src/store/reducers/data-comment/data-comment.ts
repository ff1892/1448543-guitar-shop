import { createReducer } from '@reduxjs/toolkit';
import { UploadStatus } from '../../../constants';
import { DataComment } from '../../../types/state';
import { changeCommentStatus } from '../../actions';

const initialState: DataComment = {
  commentStatus: UploadStatus.Unknown,
};

export const dataComment = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCommentStatus, (state, action) => {
      state.commentStatus = action.payload;
    });
});
