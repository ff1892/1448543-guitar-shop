import { loadAllOffers, loadAllOffersError } from '../../actions';
import { ApiRoute, QueryRoute } from '../../../constants';
import { Guitar } from '../../../types/data';
import { ThunkActionResult } from '../../../types/action';

export const fetchAllOffersAction = (query: string): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Guitar[]>(
        `${ApiRoute.Guitars}?${QueryRoute.CommentsEmbed}${query}`);
      dispatch(loadAllOffers(data));
    } catch {
      dispatch(loadAllOffersError());
    }
  };

