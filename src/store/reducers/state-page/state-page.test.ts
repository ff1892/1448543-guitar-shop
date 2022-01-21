import { StatePage } from '../../../types/state';
import { changePage } from '../../actions';
import { statePage } from './state-page';

const state: StatePage = {
  page: null,
};

describe('Reducer: statePage', () => {

  it('without additional parameters should return initial state', () => {
    expect(statePage(void 0, { type: 'UNKNOWN_TYPE' }))
      .toEqual(state);
  });

  it('should change page by a given value', () => {
    const newPage = 2;
    expect(statePage(state, changePage(newPage)))
      .toEqual({ page: newPage });
  });
});
