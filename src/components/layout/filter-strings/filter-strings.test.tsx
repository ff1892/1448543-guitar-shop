import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FilterStrings from './filter-strings';
import { filterStringsData } from '../../../constants';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FilterType', () => {

  const store = mockStore({
    STATE_FILTER: {
      filterType: [],
      filterStrings: [],
      filterPrice: { minPrice: '', maxPrice: '' },
    },
    STATE_PAGE: {
      page: 1,
    },
  });

  const fakeFilterStrings = (
    <Provider store={store}>
      <Router history={history}>
        <FilterStrings />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterStrings);
    expect(screen.getByTestId(/filter strings/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetches filter strings state', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterStrings);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action when user changes checkbox', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterStrings);
    userEvent.click(screen.getByLabelText(`${filterStringsData[0]}`));
    expect(dispatch).toBeCalledTimes(2);
  });
});
