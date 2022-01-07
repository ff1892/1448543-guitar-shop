import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';

import { screen, render } from '@testing-library/react';
import Catalog from './catalog';
import { makeFakeGuitars } from '../../../utils/mocks';

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
    priceOffers: fakeGuitars,
    isPriceOffersLoaded: true,
    isPriceOffersError: false,
    similiarOffers: fakeGuitars,
    isSimiliarOffersLoaded: true,
    isSimiliarOffersError: false,
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
});


describe('Component: Catalog', () => {

  const fakeCatalog = (
    <Provider store={store}>
      <Router history={history}>
        <Catalog />;
      </Router>
    </Provider>
  );


  it('should render correctly', () => {
    render(fakeCatalog);
    expect(screen.getByTestId(/catalog main/i)).toBeInTheDocument();
  });
});
