import {
  CatalogBreadcrumbs,
  CatalogMainSection
} from '../../components';


function Catalog (): JSX.Element {
  return (
    <main className="page-content" data-testid="catalog main">
      <div className="container">
        <CatalogBreadcrumbs />
        <CatalogMainSection />
      </div>
    </main>
  );
}

export default Catalog;
