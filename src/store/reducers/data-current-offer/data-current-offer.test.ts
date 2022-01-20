import { DataCurrentOffer } from '../../../types/state';
import {
  loadCurrentOffer,
  loadCurrentOfferError
} from '../../actions';
import { dataCurrentOffer } from './data-current-offer';
import { makeFakeGuitar } from '../../../utils/mocks';

const fakeGuitar = makeFakeGuitar();

const state: DataCurrentOffer = {
  currentOffer: null,
  isCurrentOfferLoaded: false,
  isCurrentOfferError: false,
};

describe('Reducer: dataCurrentOffer', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataCurrentOffer(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should update offer type by a given value and switch loaded status', () => {
    expect(dataCurrentOffer(state, loadCurrentOffer(fakeGuitar)))
      .toEqual({
        currentOffer: fakeGuitar,
        isCurrentOfferLoaded: true,
        isCurrentOfferError: false,
      });
  });
  it('should update eror status and switch loaded status when error loaded', () => {
    expect(dataCurrentOffer(state, loadCurrentOfferError))
      .toEqual({
        currentOffer: null,
        isCurrentOfferLoaded: true,
        isCurrentOfferError: true,
      });
  });
});
