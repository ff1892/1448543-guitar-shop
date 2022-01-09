import { filterStringsData, filterGuitarsData } from '../../../constants';
import { getIsStringMatchesTypes } from '../../../utils/common';
import { FilterStringsItem } from '../../components';
import useQuery from '../../../hooks/use-query/use-query';

function FilterStrings(): JSX.Element {
  const query = useQuery();
  const checkedTypes = query.getAll('type');

  return (
    <fieldset className="catalog-filter__block" data-testid="filter strings">
      <legend className="catalog-filter__block-title">Количество струн</legend>
      {filterStringsData.map((stringCount) => (
        <FilterStringsItem
          key={stringCount}
          stringsCount={stringCount}
          disabled={!getIsStringMatchesTypes(checkedTypes, stringCount, filterGuitarsData)}
        />
      ))}
    </fieldset>
  );
}


export default FilterStrings;
