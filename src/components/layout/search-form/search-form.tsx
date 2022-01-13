import { useState, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSimiliarOffers, getSimiliarOffersIsLoaded } from '../../../store/reducers/data-offers/selectors';
import { fetchSimiliarOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { LoadSimiliarOffersSearch } from '../../../store/actions';
import { AppRoute } from '../../../constants';
import useDebounce from '../../../hooks/use-debounce/use-debounce';

function SearchForm (): JSX.Element {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>('');
  const debauncedSearch = useDebounce(searchValue, 500).trim();
  const hasText = debauncedSearch.length;

  const similiarOffers = useSelector(getSimiliarOffers);
  const similiarOffersCount = similiarOffers.length;
  const isLoaded = useSelector(getSimiliarOffersIsLoaded);

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(evt.target.value);
  };

  useEffect(() => {
    if (hasText) {
      dispatch(LoadSimiliarOffersSearch(debauncedSearch));
      dispatch(fetchSimiliarOffersAction(debauncedSearch));
    }
  }, [dispatch, hasText, debauncedSearch]);

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit"
          onClick={(evt) => {evt.preventDefault();}}
        >
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищете?"
          onChange={onInputChange}
          value={searchValue}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>

      <ul
        className={`form-search__select-list ${hasText ? '' : 'hidden'}`}
        style={{zIndex: 2}}
      >
        {!isLoaded && <li style={{ paddingTop: '5px' }}>Ищем...</li>}
        {(isLoaded && !similiarOffersCount) && <li style={{paddingTop: '5px'}}>Ничего не нашлось</li>}
        { isLoaded && similiarOffersCount ?
          similiarOffers.map(({ id, name }) => (
            <li className="form-search__select-item" key={id}>
              <Link
                to={`${AppRoute.Guitars}/${id}`}
                style={{color: 'inherit'}}
              >
                {name}
              </Link>
            </li>
          )) : ''}
      </ul>
    </div>
  );
}

export default SearchForm;
