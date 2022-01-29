import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CatalogPagination from './catalog-pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CatalogPagination', () => {

  const store = mockStore({
    STATE_PAGE: {
      page: null,
    },
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
});
