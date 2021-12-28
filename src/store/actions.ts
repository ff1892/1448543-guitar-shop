import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Guitar } from '../types/data';
import { Sort, FilterPrice } from '../types/components';

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
