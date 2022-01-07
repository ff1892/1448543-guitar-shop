import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CatalogBreadcrumbs from './catalog-breadcrumbs';

const history = createMemoryHistory();

describe('Component: CatalogBreadcrumbs', () => {
  const fakeCatalogBreadcrumbs = (
    <Router history={history}>
      <CatalogBreadcrumbs />;
    </Router>
  );

  it('should render correctly', () => {
    render(fakeCatalogBreadcrumbs);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });
});
