import {
  PageNavigation,
  CatalogMainSection
} from '../../components';
import { AppRoute } from '../../../constants';


function Catalog (): JSX.Element {

  const { title, linkData } = {
    title: 'Каталог гитар',
    linkData: [
      { label: 'Главная', link: AppRoute.Start },
      { label: 'Каталог', link: AppRoute.Start },
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
