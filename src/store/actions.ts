import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../types/action';
import { Guitar } from '../types/data';

export const loadAllOffers = createAction(
  ActionType.LoadAllOffers,
  (allOffers: Guitar[]) => ({
    payload: allOffers,
  }),
);
