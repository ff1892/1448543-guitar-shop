import {
  CatalogNavigation,
  CatalogMainSection
} from '../../components';


function Catalog (): JSX.Element {
  return (
    <main className="page-content">
      <div className="container">
        <CatalogNavigation />
        <CatalogMainSection />
      </div>
    </main>
  );
}

export default Catalog;
