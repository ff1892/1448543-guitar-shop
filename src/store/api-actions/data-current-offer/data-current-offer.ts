import {
  loadCurrentOffer,
  loadCurrentOfferError
} from '../../actions';

import { ApiRoute, QueryRoute } from '../../../constants';
import { Guitar } from '../../../types/data';
import { ThunkActionResult } from '../../../types/action';

export const fetchCurrentOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const query = `${ApiRoute.Guitars}/${id}?${QueryRoute.CommentsEmbed}`;
    try {
      const { data } = await api.get<Guitar>(query);
      dispatch(loadCurrentOffer(data));
    } catch {
      dispatch(loadCurrentOfferError());
    }
  };
