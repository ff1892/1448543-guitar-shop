import {
  CatalogBreadcrumbs,
  CatalogMainSection
} from '../../components';


function Catalog (): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <CatalogBreadcrumbs />
        <CatalogMainSection />
      </div>
    </main>
  );
}

export default Catalog;
