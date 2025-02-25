import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';

import { screen, render } from '@testing-library/react';
import CatalogMainSection from './catalog-main-section';
import { makeFakeGuitars} from '../../../utils/mocks';

const fakeGuitars = makeFakeGuitars();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();
const store = mockStore({
  DATA_OFFERS: {
    totalCount: 3,
    allOffers: fakeGuitars,
    isAllOffersLoaded: true,
    isAllOffersError: false,
    isPriceOffersError: false,
  },
  STATE_PAGE: {
    page: 1,
  },
  STATE_SORT: {
    sort: { type: '', order: '' },
  },
  STATE_FILTER: {
    filterType: [],
    filterStrings: [],
    filterPrice: { minPrice: '', maxPrice: '' },
  },
  DATA_CART: {
    cartOffers: [fakeGuitars[0]],
  },
});


describe('Component: CatalogMainSection', () => {

  const fakeCatalogMainSection = (
    <Provider store={store}>
      <Router history={history}>
        <CatalogMainSection />;
      </Router>
    </Provider>
  );


  it('should render correctly', () => {
    render(fakeCatalogMainSection);
    expect(screen.getByTestId(/root page/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetch all and price offers and page', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCatalogMainSection);
    expect(dispatch).toBeCalledTimes(3);
  });
});
