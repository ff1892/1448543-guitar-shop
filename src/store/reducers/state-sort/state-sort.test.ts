import { StateSort } from '../../../types/state';
import { changeSort } from '../../actions';
import { stateSort } from './state-sort';

const state: StateSort = {
  sort: { type: '', order: '' },
};

describe('Reducer: stateSort', () => {
  it('without additional parameters should return initial state', () => {
    expect(stateSort(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });
  it('should change sort type by a given value', () => {
    const newSort = {type: 'someType', order: ''};
    expect(stateSort(state, changeSort(newSort)))
      .toEqual({sort: newSort});
  });
  it('should change sort order by a given value', () => {
    const newSort = {type: '', order: 'someOrder'};
    expect(stateSort(state, changeSort(newSort)))
      .toEqual({sort: newSort});
  });
  it('should change sort by a given value', () => {
    const newSort = {type: 'someSort', order: 'someOrder'};
    expect(stateSort(state, changeSort(newSort)))
      .toEqual({sort: newSort});
  });
});

