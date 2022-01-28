import { ChangeEvent, FormEvent, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { couponPostAction } from '../../../store/api-actions/data-coupon/data-coupon';
import { getCouponStatus } from '../../../store/reducers/data-coupon/selectors';
import { UploadStatus } from '../../../constants';
import { changeCouponStatus } from '../../../store/actions';

function CartCoupon (): JSX.Element {

  const dispatch = useDispatch();
  const couponStatus = useSelector(getCouponStatus);
  const isUnknown = couponStatus === UploadStatus.Unknown;
  const isPosting = couponStatus === UploadStatus.Posting;
  const isCompleted = couponStatus === UploadStatus.Completed;
  const isError = couponStatus === UploadStatus.Error;

  const inputRef = useRef <HTMLInputElement | null>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isUnknown) {
      return;
    }
    dispatch(changeCouponStatus(UploadStatus.Unknown));
  };

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const userCoupon = inputRef.current?.value;
    if (userCoupon && userCoupon.length) {
      dispatch(couponPostAction(userCoupon));
    }
  };

  useEffect( () => {
    if (isCompleted) {
      clearInput();
    }
  }, [isCompleted]);

  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        className="coupon__form"
        id="coupon-form"
        method="post"
        action="/"
        onSubmit={onFormSubmit}
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            ref={inputRef}
            onChange={onInputChange}
            disabled={isPosting}
          />
          { isCompleted &&
           <p className="form-input__message form-input__message--success">
            Промокод принят
           </p> }
          { isError &&
            <p className="form-input__message form-input__message--error">
              Неверный промокод
            </p> }
        </div>
        <button
          className="button button--big coupon__button"
          disabled={isPosting}
        >
          Применить
        </button>
      </form>
    </div>
  );
}

export default CartCoupon;
