import { createReducer } from '@reduxjs/toolkit';
import { StatePage } from '../../../types/state';
import { changePage } from '../../actions';

const initialState: StatePage = {
  page: null,
};

export const statePage = createReducer(initialState, (builder) => {
  builder
    .addCase(changePage, (state, action) => {
      state.page = action.payload;
    });
});
