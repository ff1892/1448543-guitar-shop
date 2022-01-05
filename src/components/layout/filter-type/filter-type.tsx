import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilterType } from '../../../store/actions';
import { filterGuitarsData, filterStringsData, INITIAL_PAGE} from '../../../constants';
import { getIsTypeMatchesStrings } from '../../../utils/common';
import { getFilterStrings } from '../../../store/reducers/state-filter/selectors';
import { changePage } from '../../../store/actions';
import { getPage } from '../../../store/reducers/state-page/selectors';


function FilterType (): JSX.Element {
  const dispatch = useDispatch();
  const page = useSelector(getPage);
  const [filter, setFilter] = useState<string[]>([]);
  const filterStrings = useSelector(getFilterStrings);

  const onFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {

    if (page !== INITIAL_PAGE) {
      dispatch(changePage(INITIAL_PAGE));
    }

    const isChecked = evt.currentTarget.checked;
    const currentType = evt.currentTarget.id;
    if (isChecked) {
      setFilter((prevState) => [...prevState, currentType]);
      return;
    }
    setFilter((prevState) => prevState
      .filter( (type) =>
        type !== currentType));
  };

  useEffect(() => {
    dispatch(changeFilterType(filter));
  }, [dispatch, filter]);

  return (
    <fieldset className="catalog-filter__block">
      {filterGuitarsData.map(({ type, label }) => (
        <div className="form-checkbox catalog-filter__block-item" key={type}>
          <input className="visually-hidden"
            type="checkbox"
            id={type}
            name={type}
            disabled={!getIsTypeMatchesStrings(
              filterStrings, type, filterGuitarsData, filterStringsData)}
            onChange={onFilterChange}
          />
          <label htmlFor={type}>
            {label}
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterType;
