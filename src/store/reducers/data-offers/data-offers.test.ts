import { DataOffers } from '../../../types/state';
import {
  loadTotalCount,
  loadAllOffers,
  loadAllOffersError,
  loadPriceOffers,
  loadPriceOffersError,
  loadSimiliarOffers,
  loadSimiliarOffersError
} from '../../actions';
import { dataOffers } from './data-offers';
import { makeFakeGuitars, makeFakeGuitarsNoComments } from '../../../utils/mocks';


const fakeGuitars = makeFakeGuitars();
const fakeGuitarsNoComments = makeFakeGuitarsNoComments();

const state: DataOffers = {
  totalCount: 0,
  allOffers: [],
  isAllOffersLoaded: false,
  isAllOffersError: false,
  priceOffers: [],
  isPriceOffersLoaded: false,
  isPriceOffersError: false,
  similiarOffers: [],
  isSimiliarOffersLoaded: false,
  isSimiliarOffersError: false,
};

describe('Reducer: dataOffers', () => {

  it('without additional parameters should return initial state', () => {
    expect(dataOffers(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should change total count by a given value', () => {
    expect(dataOffers(state, loadTotalCount(10)))
      .toEqual({ ...state, totalCount: 10 });
  });

  it('should change all offers and load status by a given value', () => {
    const newState = {
      allOffers: fakeGuitars,
      isAllOffersLoaded: true,
    };
    expect(dataOffers(state, loadAllOffers(fakeGuitars)))
      .toEqual({ ...state, ...newState});
  });

  it('should change all offers error status when error', () => {
    const newState = {
      isAllOffersError: true,
    };
    expect(dataOffers(state, loadAllOffersError))
      .toEqual({ ...state, ...newState});
  });

  it('should change price offers and load status by a given value', () => {
    const newState = {
      priceOffers: fakeGuitars,
      isPriceOffersLoaded: true,
    };
    expect(dataOffers(state, loadPriceOffers(fakeGuitars)))
      .toEqual({ ...state, ...newState});
  });

  it('should change price offers error status when error', () => {
    const newState = {
      isPriceOffersError: true,
    };
    expect(dataOffers(state, loadPriceOffersError))
      .toEqual({ ...state, ...newState});
  });

  it('should change similiar offers and load status by a given value', () => {
    const newState = {
      similiarOffers: fakeGuitarsNoComments,
      isSimiliarOffersLoaded: true,
    };
    expect(dataOffers(state, loadSimiliarOffers(fakeGuitarsNoComments)))
      .toEqual({ ...state, ...newState});
  });

  it('should change price similiar error status when error', () => {
    const newState = {
      isSimiliarOffersError: true,
    };
    expect(dataOffers(state, loadSimiliarOffersError))
      .toEqual({ ...state, ...newState});
  });
});
