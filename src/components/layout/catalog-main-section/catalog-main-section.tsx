import { guitarList } from '../../../mocks/data';
import {
  CatalogFilter,
  CatalogSort,
  OfferList,
  CatalogPagination
} from '../../components';

function CatalogMainSection (): JSX.Element {
  return (
    <div className = "catalog" >
      <CatalogFilter />
      <CatalogSort />
      <OfferList offerList={ guitarList } />
      <CatalogPagination />
    </div>
  );
}

export default CatalogMainSection;
