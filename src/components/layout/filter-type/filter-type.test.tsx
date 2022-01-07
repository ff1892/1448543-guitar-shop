import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FilterType from './filter-type';
import { filterGuitarsData } from '../../../constants';

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

  const fakeFilterType = (
    <Provider store={store}>
      <Router history={history}>
        <FilterType />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterType);
    expect(screen.getByTestId(/filter type/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetches filter type state', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterType);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action when user changes checkbox', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterType);
    userEvent.click(screen.getByLabelText(`${filterGuitarsData[0].label}`));
    expect(dispatch).toBeCalledTimes(2);
  });
});
