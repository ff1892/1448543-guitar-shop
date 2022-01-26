import {
  PageNavigation,
  CatalogMainSection
} from '../../components';
import { AppRoute, INITIAL_PAGE } from '../../../constants';


function Catalog (): JSX.Element {

  const { title, linkData } = {
    title: 'Каталог гитар',
    linkData: [
      { label: 'Главная', link: AppRoute.Main },
      { label: 'Каталог', link: `${AppRoute.Catalog}${AppRoute.Page}${INITIAL_PAGE}` },
    ],
  };

  return (
    <main className="page-content" data-testid="catalog main">
      <div className="container">
        <PageNavigation
          title={title}
          linkData={linkData}
        />
        <CatalogMainSection />
      </div>
    </main>
  );
}

export default Catalog;
