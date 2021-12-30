import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPriceOffers, getPriceOffersIsLoaded } from '../../../store/reducers/data-offers/selectors';
import { validatePrice } from '../../../utils';
import { changeFilterPrice } from '../../../store/actions';
import useDebounce from '../../../hooks/use-debounce';
import { INITIAL_PAGE } from '../../../constants';
import { changePage } from '../../../store/actions';
import { getPage } from '../../../store/reducers/state-page/selectors';

function FilterPrice(): JSX.Element {

  const dispatch = useDispatch();
  const priceOffers = useSelector(getPriceOffers);
  const isLoaded = useSelector(getPriceOffersIsLoaded);
  const page = useSelector(getPage);
  const [minPrice, maxPrice] = [priceOffers[0].price, priceOffers[priceOffers.length - 1].price];
  const minPriceRef = useRef<HTMLInputElement | null>(null);
  const maxPriceRef = useRef<HTMLInputElement | null>(null);

  const [currentMin, setCurrentMin] = useState<string>('');
  const [currentMax, setCurrentMax] = useState<string>('');
  const debauncedMin = useDebounce<string>(currentMin, 500);
  const debauncedMax = useDebounce<string>(currentMax, 500);

  const onMinPriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (minPriceRef.current) {
      if (page !== INITIAL_PAGE) {
        dispatch(changePage(INITIAL_PAGE));
      }
      const minInput = minPriceRef.current.value;
      const minInputNumber = parseInt(minInput, 10);
      minPriceRef.current.setCustomValidity(
        validatePrice(minInput),
      );
      if (minInputNumber >= minPrice) {
        setCurrentMin(minInput);
      }
      minPriceRef.current.reportValidity();
    }
  };

  const onMinPriceLeave = (evt: FocusEvent<HTMLInputElement>): void => {
    if (minPriceRef.current && maxPriceRef.current) {
      const minInputNumber = parseInt(minPriceRef.current.value, 10);
      const maxInputNumber = parseInt(maxPriceRef.current.value, 10);
      if (minInputNumber < minPrice) {
        minPriceRef.current.value = minPrice.toString();
        setCurrentMin(minPriceRef.current.value);
      }
      if (minInputNumber > maxPrice) {
        minPriceRef.current.value = maxPrice.toString();
        setCurrentMin(minPriceRef.current.value);
      }
      if (minInputNumber > maxInputNumber && maxPriceRef.current.value !== '') {
        minPriceRef.current.value = maxInputNumber.toString();
        setCurrentMin(minPriceRef.current.value);
      }
      if (minPriceRef.current.value === '') {
        setCurrentMin('');
      }
    }
  };

  const onMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if (maxPriceRef.current) {
      if (page !== INITIAL_PAGE) {
        dispatch(changePage(INITIAL_PAGE));
      }
      const maxInput = maxPriceRef.current.value;
      const maxInputNumber = parseInt(maxInput, 10);
      maxPriceRef.current.setCustomValidity(
        validatePrice(maxInput),
      );
      if (maxInputNumber <= maxPrice && maxInputNumber >= minPrice) {
        setCurrentMax(maxInput);
      }
      maxPriceRef.current.reportValidity();
    }
  };

  const onMaxPriceLeave = (evt: FocusEvent<HTMLInputElement>): void => {
    if (maxPriceRef.current && minPriceRef.current) {
      const minInputNumber = parseInt(minPriceRef.current.value, 10);
      const maxInputNumber = parseInt(maxPriceRef.current.value, 10);
      if (maxInputNumber > maxPrice) {
        maxPriceRef.current.value = maxPrice.toString();
        setCurrentMax(maxPriceRef.current.value);
      }
      if (maxInputNumber < minPrice) {
        maxPriceRef.current.value = minPrice.toString();
        setCurrentMax(maxPriceRef.current.value);
      }
      if (maxInputNumber < minInputNumber && minPriceRef.current.value !== '') {
        maxPriceRef.current.value = minInputNumber.toString();
        setCurrentMax(maxPriceRef.current.value);
      }
      if (maxPriceRef.current.value === '') {
        setCurrentMax('');
      }
    }
  };

  useEffect(() => {
    dispatch(changeFilterPrice(
      { minPrice: debauncedMin, maxPrice: debauncedMax },
    ));
  }, [dispatch, debauncedMin, debauncedMax]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={isLoaded ? minPrice.toLocaleString(): ''}
            id="priceMin"
            name="от"
            onChange={onMinPriceChange}
            onBlur={onMinPriceLeave}
            ref={minPriceRef}
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
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
