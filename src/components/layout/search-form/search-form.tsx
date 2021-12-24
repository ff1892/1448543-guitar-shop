import { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOffers } from '../../../store/reducers/data-offers/selectors';
import { getFilteredOffersByName } from '../../../utils';
import { AppRoute } from '../../../constants';

function SearchForm (): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');

  const allOffers = useSelector(getAllOffers);
  const filteredOffers = searchValue ? getFilteredOffersByName(searchValue, allOffers) : [];

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(evt.target.value);
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          onChange={onInputChange}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${filteredOffers.length ? '' : 'hidden'}`}
        style={{zIndex: 2}}
      >
        {
          filteredOffers.map(({ id, name }) => (
            <li className="form-search__select-item" key={id}>
              <Link
                to={`${AppRoute.Guitars}/${id}`}
                style={{color: 'inherit'}}
              >
                {name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default SearchForm;
