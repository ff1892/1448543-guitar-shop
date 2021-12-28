import { createReducer } from '@reduxjs/toolkit';
import { StateFilter } from '../../../types/state';
import {
  changeFilterType,
  changeFilterStrings,
  changeFilterPrice
} from '../../actions';

const initialState: StateFilter = {
  filterType: [],
  filterStrings: [],
  filterPrice: {minPrice: '', maxPrice: ''},
};

export const stateFilter = createReducer(initialState, (builder) => {
  builder
    .addCase(changeFilterType, (state, action) => {
      state.filterType = action.payload;
    })
    .addCase(changeFilterStrings, (state, action) => {
      state.filterStrings = action.payload;
    })
    .addCase(changeFilterPrice, (state, action) => {
      state.filterPrice = action.payload;
    });
});
