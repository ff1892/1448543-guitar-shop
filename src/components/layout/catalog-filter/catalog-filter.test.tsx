import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CatalogFilter from './catalog-filter';
import { makeFakeGuitarsNoComments } from '../../../utils/mocks';

const fakeGuitars = makeFakeGuitarsNoComments();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {

  const storeLoaded = mockStore({
    STATE_PAGE: {
      page: 1,
    },
    DATA_OFFERS: {
      priceOffers: fakeGuitars,
      isPriceOffersLoaded: true,
    },
    STATE_FILTER: {
      filterType: [],
      filterStrings: [],
      filterPrice: { minPrice: '', maxPrice: '' },
    },
  });

  const storeNotLoaded = mockStore({
    STATE_PAGE: {
      page: 1,
    },
    DATA_OFFERS: {
      isPriceOffersLoaded: false,
    },
    STATE_FILTER: {
      filterType: [],
      filterStrings: [],
      filterPrice: { minPrice: '', maxPrice: '' },
    },
  });

  const fakeCatalogFilterLoaded = (
    <Provider store={storeLoaded}>
      <Router history={history}>
        <CatalogFilter />
      </Router>
    </Provider>
  );

  const fakeCatalogFilterNotLoaded = (
    <Provider store={storeNotLoaded}>
      <Router history={history}>
        <CatalogFilter />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCatalogFilterLoaded);
    expect(screen.getByTestId(/catalog filter/i)).toBeInTheDocument();
  });

  it('should render price filter when price offers have been loaded', () => {
    render(fakeCatalogFilterLoaded);
    expect(screen.getByTestId(/filter price/i)).toBeInTheDocument();
  });

  it('should not render price filter when price offers have not been loaded', () => {
    render(fakeCatalogFilterNotLoaded);
    expect(screen.queryByTestId(/filter price/i)).not.toBeInTheDocument();
  });
});
