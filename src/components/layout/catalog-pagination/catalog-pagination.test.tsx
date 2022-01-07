import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import CatalogPagination from './catalog-pagination';
// import { makeFakeGuitar } from '../../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
// const fakeGuitar = makeFakeGuitar();
// const guitars = new Array(10).fill(fakeGuitar);

describe('Component: CatalogPagination', () => {

  const store = mockStore({
    // STATE_PAGE: {
    //   page: 1,
    // },
  });

  const fakeCatalogPagination = (
    <Provider store={store}>
      <Router history={history}>
        <CatalogPagination offers={20}/>
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCatalogPagination);
    expect(screen.getByTestId(/pagination/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetches page state', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCatalogPagination);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action when user changes page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCatalogPagination);
    userEvent.click(screen.getByTestId(/page 2/i));
    userEvent.click(screen.getByTestId(/page 3/i));
    expect(dispatch).toBeCalledTimes(2);
  });
});
