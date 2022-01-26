import { useSelector } from 'react-redux';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { Guitar } from '../../../types/data';
import { CartItemCounter } from '../../components';

import {
  getFormattedPrice,
  getFormattedType,
  getSameOffersCount
} from '../../../utils/common';

type CartItemProps = {
  offer: Guitar,
};

function CartItem ({ offer }: CartItemProps): JSX.Element {

  const {
    previewImg,
    type,
    name,
    vendorCode,
    stringCount,
    price,
    id,
  } = offer;

  const offersInCart = useSelector(getOffersInCart);
  const sameOffersCount = getSameOffersCount(offersInCart, id);
  const formattedType = getFormattedType(type);
  const formattedPrice = getFormattedPrice(price);
  const formattedTotalPrice = getFormattedPrice(price * sameOffersCount);

  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={`../${previewImg}`}
          alt={`${formattedType} ${name}`}
          width="55"
          height="130"
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{formattedType}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formattedPrice}</div>
      <CartItemCounter offer={offer} />
      <div className="cart-item__price-total">{formattedTotalPrice}</div>
    </div>
  );
}

export default CartItem;
