import { createReducer } from '@reduxjs/toolkit';
import { DataOffers } from '../../../types/state';
import {
  loadTotalCount,
  loadAllOffers,
  loadAllOffersError,
  loadPriceOffers,
  loadPriceOffersError,
  loadSimiliarOffers,
  loadSimiliarOffersError,
  LoadSimiliarOffersSearch
} from '../../actions';

import { filterSimiliarOffers } from '../../../utils/common';

const initialState: DataOffers = {
  totalCount: 0,
  allOffers: [],
  isAllOffersLoaded: false,
  isAllOffersError: false,
  priceOffers: [],
  isPriceOffersLoaded: false,
  isPriceOffersError: false,
  similiarOffers: [],
  similiarOffersSearch: '',
  isSimiliarOffersLoaded: false,
  isSimiliarOffersError: false,
};

export const dataOffers = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTotalCount, (state, action) => {
      state.totalCount = action.payload;
    })
    .addCase(loadAllOffers, (state, action) => {
      state.isAllOffersError = false;
      state.allOffers = action.payload;
      state.isAllOffersLoaded = true;
    })
    .addCase(loadAllOffersError, (state, _action) => {
      state.isAllOffersError = true;
    })
    .addCase(loadPriceOffers, (state, action) => {
      state.isPriceOffersError = false;
      state.priceOffers = action.payload;
      state.isPriceOffersLoaded = true;
    })
    .addCase(loadPriceOffersError, (state, _action) => {
      state.isPriceOffersError = true;
    })
    .addCase(LoadSimiliarOffersSearch, (state, action) => {
      state.similiarOffersSearch = action.payload;
    })
    .addCase(loadSimiliarOffers, (state, action) => {
      state.isSimiliarOffersLoaded= false;
      state.isSimiliarOffersError = false;
      state.similiarOffers = filterSimiliarOffers(action.payload, state.similiarOffersSearch);
      state.isSimiliarOffersLoaded = true;
    })
    .addCase(loadSimiliarOffersError, (state, _action) => {
      state.isSimiliarOffersError = true;
    });
});
