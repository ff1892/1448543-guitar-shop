import { useState, MouseEvent, useEffect } from 'react';
import { Sort } from '../../../types/components';
import { ButtonLabel } from '../../../constants';
import { useDispatch } from 'react-redux';
import { changeSort } from '../../../store/actions';


function CatalogSort(): JSX.Element {
  const dispatch = useDispatch();
  const [sort, setSort] = useState<Sort>({type: '', order: ''});
  const { type, order } = sort;

  const typeButtonsData = [
    { sortType: ButtonLabel.Price, name: 'по цене'},
    { sortType: ButtonLabel.Rating, name: 'по популярности'},
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
  };

  const onOrderButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    const currentOrder = evt.currentTarget.dataset.order;
    if (!currentOrder) {
      return;
    }
    const newSort = type ? { ...sort, order: currentOrder } :
      { type: ButtonLabel.Price, order: currentOrder };
    setSort(newSort);
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
              onClick={onOrderButtonClick}
            >
            </button>);
        })}
      </div>
    </div>
  );
}

export default CatalogSort;
