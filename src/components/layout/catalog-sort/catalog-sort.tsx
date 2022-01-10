import { useState, MouseEvent, useEffect } from 'react';
import { Sort } from '../../../types/components';
import { ButtonLabel, HistoryRoute } from '../../../constants';
import { useDispatch } from 'react-redux';
import { changeSort } from '../../../store/actions';
import { useHistory } from 'react-router-dom';
import useQuery from '../../../hooks/use-query/use-query';


function CatalogSort(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const typeQuery = query.get(HistoryRoute.Sort);
  const orderQuery = query.get(HistoryRoute.Order);

  const [sort, setSort] = useState<Sort>({
    type: typeQuery || '',
    order: orderQuery || '',
  });
  const { type, order } = sort;

  const typeButtonsData = [
    { sortType: ButtonLabel.Price, name: 'По цене'},
    { sortType: ButtonLabel.Rating, name: 'По популярности'},
  ];

  const orderButtonsData = [
    { sortOrder: ButtonLabel.Ascending, name: 'По возрастанию'},
    { sortOrder: ButtonLabel.Descending, name: 'По убыванию'},
  ];

  const onTypeButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentType = evt.currentTarget.dataset.type;
    if (!currentType) {
      return;
    }
    const newSort = order ? { ...sort, type: currentType } :
      { order: ButtonLabel.Descending, type: currentType };
    setSort(newSort);
    query.set(HistoryRoute.Sort, newSort.type);
    if (newSort.order) {
      query.set(HistoryRoute.Order, newSort.order);
    }
    history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
  };

  const onOrderButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentOrder = evt.currentTarget.dataset.order;
    if (!currentOrder) {
      return;
    }
    const newSort = type ? { ...sort, order: currentOrder } :
      { type: ButtonLabel.Price, order: currentOrder };
    setSort(newSort);
    query.set(HistoryRoute.Order, newSort.order);
    query.set(HistoryRoute.Sort, newSort.type);
    history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
  };

  useEffect(() => {
    dispatch(changeSort(sort));
  }, [dispatch, sort]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {typeButtonsData.map(({ sortType, name }) => {
          const isSelected = sortType === type;
          return (
            <button
              className={`catalog-sort__type-button
                ${isSelected ? 'catalog-sort__type-button--active' : ''}`}
              key={sortType}
              aria-label={name}
              tabIndex={isSelected ? -1 : 0}
              data-type={sortType}
              data-testid={sortType}
              onClick={onTypeButtonClick}
            >
              { name }
            </button>);
        })}
      </div>
      <div className="catalog-sort__order">

        {orderButtonsData.map(({ sortOrder,  name }) => {
          const isSelected = sortOrder === order;
          return (
            <button
              key={sortOrder}
              className={`catalog-sort__order-button
                catalog-sort__order-button--${sortOrder === ButtonLabel.Ascending ? 'up' : 'down'}
                ${isSelected ? 'catalog-sort__order-button--active': ''}`}
              aria-label={name}
              tabIndex={isSelected ? -1 : 0}
              data-order={sortOrder}
              data-testid={sortOrder}
              onClick={onOrderButtonClick}
            >
            </button>);
        })}
      </div>
    </div>
  );
}

export default CatalogSort;
