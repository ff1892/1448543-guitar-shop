import { useSelector } from 'react-redux';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { getDiscount } from '../../../store/reducers/data-coupon/selectors';
import { getTotalPrice, getFormattedPrice } from '../../../utils/common';
import { getCouponStatus } from '../../../store/reducers/data-coupon/selectors';
import { UploadStatus } from '../../../constants';

function CartTotal (): JSX.Element {

  const discount = useSelector(getDiscount);
  const offers = useSelector(getOffersInCart);
  const initialPrice = getTotalPrice(offers);
  const discountPrice = initialPrice * discount / 100;
  const finalPrice = initialPrice - discountPrice;

  const couponStatus = useSelector(getCouponStatus);
  const isCouponPosting = couponStatus === UploadStatus.Posting;

  return (
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">
          Всего:
        </span>
        <span className="cart__total-value">
          { getFormattedPrice(initialPrice) }
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">
          Скидка:
        </span>
        { discount ?
          <span className="cart__total-value cart__total-value--bonus">
            - { getFormattedPrice(discountPrice) }
          </span>
          :
          <span className="cart__total-value">
            { getFormattedPrice(discountPrice) }
          </span> }
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">
          К оплате:
        </span>
        <span className="cart__total-value cart__total-value--payment">
          { getFormattedPrice(finalPrice) }
        </span>
      </p>
      <button
        className="button button--red button--big cart__order-button"
        disabled={isCouponPosting}
      >
        Оформить заказ
      </button>
    </div>
  );
}

export default CartTotal;
