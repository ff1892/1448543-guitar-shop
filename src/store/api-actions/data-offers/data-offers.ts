import { loadAllOffers } from '../../actions';
import { ApiRoute } from '../../../constants';
import { Guitar } from '../../../types/data';
import { ThunkActionResult } from '../../../types/action';

export const fetchAllOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<Guitar[]>(ApiRoute.Guitars);
      dispatch(loadAllOffers(data));
    } catch {
      // dispatch(loadAllOffers([]));
    }
  };

