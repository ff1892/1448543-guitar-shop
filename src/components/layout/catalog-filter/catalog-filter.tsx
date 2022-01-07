import { FilterType,
  FilterStrings,
  FilterPrice
} from '../../components';
import { getPriceOffersIsLoaded } from '../../../store/reducers/data-offers/selectors';
import { useSelector } from 'react-redux';

function CatalogFilter (): JSX.Element {

  const isLoaded = useSelector(getPriceOffersIsLoaded);

  return (
    <form className="catalog-filter" data-testid="catalog filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      { isLoaded && <FilterPrice /> }
      <FilterType />
      <FilterStrings />
    </form>
  );
}

export default CatalogFilter;
