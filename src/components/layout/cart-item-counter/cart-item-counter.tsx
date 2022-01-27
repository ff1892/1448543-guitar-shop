import './style.css';
import { MouseEvent, ChangeEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { updateCartOffers } from '../../../store/actions';
import { Guitar } from '../../../types/data';
import { OrderCount } from '../../../constants';

import {
  getSameOffersCount,
  updateString,
  getOnCounterLeaveString
} from '../../../utils/common';

type CartItemCounterProps = {
  offer: Guitar,
  onDeleteClick: (evt: MouseEvent<HTMLButtonElement>) => void,
};

const CounterSettings = {
  MinNum: OrderCount.Min,
  MaxNum: OrderCount.Max,
  MinStr: OrderCount.Min.toString(),
  MaxStr: OrderCount.Max.toString(),
} as const;


function CartItemCounter ({ offer, onDeleteClick }: CartItemCounterProps): JSX.Element {

  const dispatch = useDispatch();

  const offersInCart = useSelector(getOffersInCart);
  const sameOffersCount = getSameOffersCount(offersInCart, offer.id);

  const [value, setValue] = useState<string>(sameOffersCount.toString());
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isOnLeaveLaunched, setIsOnLeaveLaunched] = useState<boolean>(false);

  const numValue = parseInt(value, 10);
  const isMaxNum = numValue === CounterSettings.MaxNum;
  const isMinNum = numValue === CounterSettings.MinNum;

  const validateInput = (input: number) => {
    if (input < CounterSettings.MinNum || input > CounterSettings.MaxNum) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  };

  const onDecreaseBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    validateInput(numValue);
    if (isMaxNum && isOnLeaveLaunched) {
      setIsOnLeaveLaunched(false);
      return;
    }
    if (isMinNum) {
      onDeleteClick(evt);
      return;
    }
    setIsOnLeaveLaunched(false);
    setValue((prevValue) => updateString(prevValue, -1));
  };

  const onIncreaseBtnClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    validateInput(numValue);
    if (isMinNum && isOnLeaveLaunched) {
      setIsOnLeaveLaunched(false);
      return;
    }
    setIsOnLeaveLaunched(false);
    setValue((prevValue) => updateString(prevValue, 1));
  };

  const onInputCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentInput = evt.currentTarget.value;
    if (currentInput === '') {
      setValue('');
      setIsValid(false);
      return;
    }
    const currentNum = parseInt(currentInput, 10);
    validateInput(currentNum);
    setValue(currentInput);
  };

  const onInputCountLeave = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentInput = getOnCounterLeaveString(
      evt.currentTarget.value, [CounterSettings.MinNum, CounterSettings.MaxNum]);
    if (!isValid) {
      setValue(currentInput);
      setIsValid(true);
      setIsOnLeaveLaunched(true);
    }
  };

  useEffect(
    () => {
      if (isValid) {
        dispatch(updateCartOffers(offer, numValue));
      }
    }, [isValid, numValue, dispatch, offer],
  );

  return (
    <div className="quantity cart-item__quantity">
      <button
        className="quantity__button"
        aria-label="Уменьшить количество"
        onClick={onDecreaseBtnClick}
        disabled={numValue < CounterSettings.MinNum}
      >
        <svg width="8" height="8" aria-hidden="true">
          <use xlinkHref="#icon-minus"></use>
        </svg>
      </button>
      <input
        className="quantity__input"
        type="number"
        id="2-count"
        name="2-count"
        max="99"
        placeholder={value}
        value={value}
        onChange={onInputCountChange}
        onBlur={onInputCountLeave}
      />
      <button
        className="quantity__button"
        aria-label="Увеличить количество"
        onClick={onIncreaseBtnClick}
        disabled={numValue >= CounterSettings.MaxNum}
      >
        <svg width="8" height="8" aria-hidden="true">
          <use xlinkHref="#icon-plus"></use>
        </svg>
      </button>
      { !isValid &&
        <span className="counter__warning">
          Число <br /> от {CounterSettings.MinNum} до {CounterSettings.MaxNum}
        </span> }
      { isMaxNum &&
        <span className="counter__warning counter__warning--store">
          Это всё, что есть в наличии
        </span> }
    </div>
  );
}

export default CartItemCounter;
