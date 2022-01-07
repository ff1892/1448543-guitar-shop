import {
  loadTotalCount,
  loadAllOffers,
  loadAllOffersError,
  loadPriceOffers,
  loadPriceOffersError,
  loadSimiliarOffers,
  loadSimiliarOffersError
} from '../../actions';

import { ApiRoute, QueryRoute, TOTAL_COUNT_HEADER } from '../../../constants';
import { Guitar, GuitarNoComments } from '../../../types/data';
import { ThunkActionResult } from '../../../types/action';

export const fetchAllOffersAction = (query: string, comments = true): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const fullQuery = `${ApiRoute.Guitars}?${comments ? QueryRoute.CommentsEmbed: ''}${query}`;
    try {
      const { data, headers } = await api.get<Guitar[]>(fullQuery);
      dispatch(loadAllOffers(data));
      dispatch(loadTotalCount(headers[TOTAL_COUNT_HEADER]));
    } catch {
      dispatch(loadAllOffersError());
    }
  };

export const fetchPriceOffersAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const fullQuery = `${ApiRoute.Guitars}?${query}`;
    try {
      const { data } = await api.get<Guitar[]>(fullQuery);
      dispatch(loadPriceOffers(data));
    } catch {
      dispatch(loadPriceOffersError());
    }
  };

export const fetchSimiliarOffersAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const fullQuery = `${ApiRoute.Guitars}?${QueryRoute.Similiar}${query}`;
    try {
      const { data } = await api.get<GuitarNoComments[]>(fullQuery);
      dispatch(loadSimiliarOffers(data));
    } catch {
      dispatch(loadSimiliarOffersError());
    }
  };

