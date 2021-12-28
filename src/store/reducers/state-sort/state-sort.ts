import { createReducer } from '@reduxjs/toolkit';
import { StateSort } from '../../../types/state';
import { changeSort} from '../../actions';

const initialState: StateSort = {
  sort: {type: '', order: ''},
};

export const stateSort = createReducer(initialState, (builder) => {
  builder
    .addCase(changeSort, (state, action) => {
      state.sort = action.payload;
    });
});
