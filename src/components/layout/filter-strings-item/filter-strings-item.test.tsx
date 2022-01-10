import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FilterStringsItem from './filter-strings-item';

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

  const fakeFilterStringsItem = (
    <Provider store={store}>
      <Router history={history}>
        <FilterStringsItem stringsCount='4' disabled={false} />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterStringsItem);
    expect(screen.getByTestId(/filter strings item/i)).toBeInTheDocument();
  });

  it('should dispach an action when user changes checkbox', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterStringsItem);
    userEvent.click(screen.getByRole('checkbox'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
