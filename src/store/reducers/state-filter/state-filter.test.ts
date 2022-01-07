import { StateFilter } from '../../../types/state';
import {
  changeFilterType,
  changeFilterStrings,
  changeFilterPrice
} from '../../actions';
import { stateFilter } from './state-filter';

const state: StateFilter = {
  filterType: [],
  filterStrings: [],
  filterPrice: { minPrice: '', maxPrice: '' },
};

describe('Reducer: stateFilter', () => {

  it('without additional parameters should return initial state', () => {
    expect(stateFilter(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should change filter type by a given value', () => {
    const newFilterType = ['filter_1', 'filter_2'];
    expect(stateFilter(state, changeFilterType(newFilterType)))
      .toEqual({ ...state, filterType: newFilterType });
  });

  it('should change filter strings by a given value', () => {
    const newFilterType = ['filter_1', 'filter_2'];
    expect(stateFilter(state, changeFilterStrings(newFilterType)))
      .toEqual({ ...state, filterStrings: newFilterType });
  });

  it('should change filter price by a given value', () => {
    const newFilterPrice = { minPrice: '2000', maxPrice: '3000' };
    expect(stateFilter(state, changeFilterPrice(newFilterPrice)))
      .toEqual({ ...state, filterPrice: newFilterPrice });
  });
});
