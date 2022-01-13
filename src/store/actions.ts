import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Guitar, GuitarNoComments } from '../types/data';
import { Sort, FilterPrice } from '../types/components';

export const loadTotalCount = createAction(
  ActionType.LoadTotalCount,
  (totalCount: number) => ({
    payload: totalCount,
  }),
);

export const loadAllOffers = createAction(
  ActionType.LoadAllOffers,
  (allOffers: Guitar[]) => ({
    payload: allOffers,
  }),
);

export const loadAllOffersError = createAction(ActionType.LoadAllOffersError);

export const loadPriceOffers = createAction(
  ActionType.LoadPriceOffers,
  (priceOffers: Guitar[]) => ({
    payload: priceOffers,
  }),
);

export const loadPriceOffersError = createAction(ActionType.LoadPriceOffersError);

export const loadSimiliarOffers = createAction(
  ActionType.LoadSimiliarOffers,
  (similiarOffers: GuitarNoComments[]) => ({
    payload: similiarOffers,
  }),
);

export const LoadSimiliarOffersSearch = createAction(
  ActionType.LoadSimiliarOffersSearch,
  (similiarOffersSearch: string) => ({
    payload: similiarOffersSearch,
  }),
);

export const loadSimiliarOffersError = createAction(ActionType.LoadSimiliarOffersError);

export const changeSort = createAction(
  ActionType.ChangeSort,
  (sort: Sort) => ({
    payload: sort,
  }),
);

export const changeFilterType = createAction(
  ActionType.ChangeFilterType,
  (filterType: string[]) => ({
    payload: filterType,
  }),
);

export const changeFilterStrings = createAction(
  ActionType.ChangeFilterStrings,
  (filterStrings: string[]) => ({
    payload: filterStrings,
  }),
);

export const changeFilterPrice = createAction(
  ActionType.ChangeFilterPrice,
  (filterPrice: FilterPrice) => ({
    payload: filterPrice,
  }),
);

export const changePage = createAction(
  ActionType.ChangePage,
  (page: number) => ({
    payload: page,
  }),
);
