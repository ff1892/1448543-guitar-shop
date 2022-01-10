import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changePage } from '../../../store/actions';
import useQuery from '../../../hooks/use-query/use-query';
import { INITIAL_PAGE, HistoryRoute } from '../../../constants';

type FilterStringsItemProps = {
  stringsCount: string,
  disabled: boolean,
};

function FilterStringsItem ({ stringsCount, disabled }: FilterStringsItemProps): JSX.Element {

  const stringName = `${stringsCount}-strings`;
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const checkedItems = query.getAll('stringCount');
  const { pathname } = useLocation();

  const [isChecked, setIsChecked] = useState<boolean>(
    checkedItems.includes(stringsCount) && !disabled,
  );

  useEffect(() => {
    if (disabled && checkedItems.includes(stringsCount)) {
      query.delete('stringCount');
      const checkedStrings = checkedItems.filter((item) => item !== stringsCount);
      checkedStrings.forEach((item) => query.append('stringCount', item));
      history.replace({ pathname: pathname, search: query.toString() });
    }
    setIsChecked(checkedItems.includes(stringsCount) && !disabled);
  }, [query, checkedItems, history, pathname, stringsCount, disabled ]);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setIsChecked(checked);
    query.delete('stringCount');

    if (checked) {
      checkedItems.push(stringsCount);
      checkedItems.forEach((item) => query.append('stringCount', item));
    } else {
      const checkedStrings = checkedItems.filter((item) => stringsCount !== item);
      checkedStrings.forEach((item) => query.append('stringCount', item));
    }
    dispatch(changePage(INITIAL_PAGE));
    history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
  };

  return(
    <div className="form-checkbox catalog-filter__block-item">
      <input
        className="visually-hidden"
        type="checkbox"
        id={stringName}
        name={stringName}
        data-strings={stringsCount}
        checked={isChecked}
        onChange={onInputChange}
        disabled={disabled}
      />
      <label htmlFor={stringName}>
        {stringsCount}
      </label>
    </div>
  );
}

export default FilterStringsItem;
