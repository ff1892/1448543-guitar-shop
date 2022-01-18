import { Link } from 'react-router-dom';
import { AppRoute, INITIAL_PAGE } from '../../../constants';

type OfferNavigationProps = {
  name: string,
  id: number,
};


function OfferNavigation({ name, id }: OfferNavigationProps): JSX.Element {
  return (
    <>
      <h1 className="page-content__title title title--bigger">
        {name}
      </h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.Main}>
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={`${AppRoute.Catalog}${AppRoute.Page}${INITIAL_PAGE}`}>
            Каталог
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={`${AppRoute.Guitars}/${id}`}>
            {name}
          </Link>
        </li>
      </ul>
    </>
  );
}

export default OfferNavigation;
