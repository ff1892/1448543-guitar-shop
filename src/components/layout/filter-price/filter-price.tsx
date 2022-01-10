import { ChangeEvent,
  FocusEvent,
  useEffect,
  useRef,
  useState }
  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPriceOffers, getPriceOffersIsLoaded } from '../../../store/reducers/data-offers/selectors';
import { validatePrice } from '../../../utils/common';
import { changeFilterPrice } from '../../../store/actions';
import useDebounce from '../../../hooks/use-debounce/use-debounce';
import { HistoryRoute, INITIAL_PAGE } from '../../../constants';
import { changePage } from '../../../store/actions';
import useQuery from '../../../hooks/use-query/use-query';
import { useHistory, useLocation } from 'react-router-dom';

function FilterPrice(): JSX.Element {

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const { pathname } = useLocation();

  const priceOffers = useSelector(getPriceOffers);
  const [minPrice, maxPrice] = [priceOffers[0].price, priceOffers[priceOffers.length - 1].price];

  const isLoaded = useSelector(getPriceOffersIsLoaded);
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const minQuery = query.get('price_gte') || '';
  const maxQuery = query.get('price_lte') || '';

  const [currentMin, setCurrentMin] = useState<string>(minQuery);
  const [currentMax, setCurrentMax] = useState<string>(maxQuery);

  const debauncedMin = useDebounce<string>(currentMin, 500);
  const debauncedMax = useDebounce<string>(currentMax, 500);

  const onMinPriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (minPriceRef.current) {
      const minInput = minPriceRef.current.value.replace(/^[0-]+/, '');

      if (minInput) {
        minPriceRef.current.setCustomValidity(
          validatePrice(minInput),
        );
        minPriceRef.current.reportValidity();
        setCurrentMin(minInput);
        query.set('price_gte', minInput);
        dispatch(changePage(INITIAL_PAGE));
        history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
        return;
      }
      setCurrentMin('');
      query.delete('price_gte');
      history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
    }
  };

  const onMinPriceLeave = (evt: FocusEvent<HTMLInputElement>): void => {
    if (currentMin !== '') {
      const minInputNumber = parseInt(currentMin, 10);
      const maxInputNumber = parseInt(currentMax, 10);
      let minLeave = currentMin;
      if (minInputNumber < minPrice) {
        minLeave = minPrice.toString();
      }
      if (minInputNumber > maxPrice) {
        minLeave = maxPrice.toString();
      }
      if (minInputNumber > maxInputNumber && currentMax !== '') {
        minLeave = maxInputNumber.toString();
      }
      setCurrentMin(minLeave);
      query.set('price_gte', minLeave);
      history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
      return;
    }
    query.delete('price_gte');
    history.push({ pathname: pathname, search: query.toString() });
  };

  const onMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (maxPriceRef.current) {
      const maxInput = maxPriceRef.current.value.replace(/^[0-]+/, '');

      if (maxInput) {
        maxPriceRef.current.setCustomValidity(
          validatePrice(maxInput),
        );
        maxPriceRef.current.reportValidity();
        setCurrentMax(maxInput);
        dispatch(changePage(INITIAL_PAGE));
        query.set('price_lte', maxInput);
        history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
        return;
      }
      setCurrentMax('');
      query.delete('price_lte');
      history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
    }
  };

  const onMaxPriceLeave = (evt: FocusEvent<HTMLInputElement>): void => {
    if (currentMax !== '') {
      const minInputNumber = parseInt(currentMin, 10);
      const maxInputNumber = parseInt(currentMax, 10);
      let maxLeave = currentMax;
      if (maxInputNumber > maxPrice) {
        maxLeave = maxPrice.toString();
      }
      if (maxInputNumber < minPrice) {
        maxLeave = minPrice.toString();
      }
      if (maxInputNumber < minInputNumber && currentMin !== '') {
        maxLeave = minInputNumber.toString();
      }
      setCurrentMax(maxLeave);
      query.set('price_lte', maxLeave);
      history.push({ pathname: HistoryRoute.InitialPagePathname, search: query.toString() });
      return;
    }
    query.delete('price_lte');
    history.push({ pathname: pathname, search: query.toString() });
  };

  useEffect(() => {
    dispatch(changeFilterPrice(
      { minPrice: debauncedMin, maxPrice: debauncedMax },
    ));
  }, [dispatch, debauncedMin, debauncedMax]);

  return (
    <fieldset className="catalog-filter__block" data-testid="filter price">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={isLoaded ? minPrice.toLocaleString(): ''}
            id="priceMin"
            data-testid="price min"
            name="от"
            onChange={onMinPriceChange}
            onBlur={onMinPriceLeave}
            ref={minPriceRef}
            value={currentMin}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={isLoaded ? maxPrice.toLocaleString(): ''}
            id="priceMax"
            name="до"
            onChange={onMaxPriceChange}
            onBlur={onMaxPriceLeave}
            ref={maxPriceRef}
            value={currentMax}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
