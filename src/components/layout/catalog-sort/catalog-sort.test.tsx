import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import CatalogSort from './catalog-sort';
import { ButtonLabel } from '../../../constants';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogSort', () => {

  const store = mockStore({
    STATE_SORT: {
      sort: {type: '', order: ''},
    },
  });

  const fakeCatalogSort = (
    <Provider store={store}>
      <Router history={history}>
        <CatalogSort />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCatalogSort);
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetches sort state', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCatalogSort);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action when user changes sort', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCatalogSort);
    userEvent.click(screen.getByTestId(ButtonLabel.Price));
    userEvent.click(screen.getByTestId(ButtonLabel.Rating));
    userEvent.click(screen.getByTestId(ButtonLabel.Ascending));
    userEvent.click(screen.getByTestId(ButtonLabel.Descending));
    expect(dispatch).toBeCalledTimes(4);
  });
});
