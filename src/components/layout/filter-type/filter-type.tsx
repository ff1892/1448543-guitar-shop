import { filterGuitarsData, filterStringsData} from '../../../constants';
import { getIsTypeMatchesStrings } from '../../../utils/common';
import { FilterTypeItem } from '../../components';
import useQuery from '../../../hooks/use-query/use-query';

function FilterType (): JSX.Element {

  const query = useQuery();
  const checkedStrings = query.getAll('stringCount');

  return (
    <fieldset className="catalog-filter__block" data-testid="filter type">
      {filterGuitarsData.map(({ type, label }) => (
        <FilterTypeItem
          key={type}
          type={type}
          label={label}
          disabled={!getIsTypeMatchesStrings(
            checkedStrings, type, filterGuitarsData, filterStringsData)}
        />
      ))}
    </fieldset>
  );
}

export default FilterType;
