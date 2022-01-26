import { useSelector } from 'react-redux';
import { AppRoute, INITIAL_PAGE } from '../../../constants';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { getUniqueOffers } from '../../../utils/common';


import {
  PageNavigation,
  CartItem,
  CartCoupon,
  CartTotal
} from '../../components';

function Cart (): JSX.Element {

  const { title, linkData } = {
    title: 'Корзина',
    linkData: [
      { label: 'Главная', link: AppRoute.Main },
      { label: 'Каталог', link: `${AppRoute.Catalog}${AppRoute.Page}${INITIAL_PAGE}`},
      { label: 'Корзина', link: AppRoute.Cart},
    ],
  };

  const offers = useSelector(getOffersInCart);
  const uniqueOffers = getUniqueOffers(offers);

  return (
    <main className="page-content">
      <div className="container">
        <PageNavigation title={title} linkData={linkData}/>
        <div className="cart">
          { uniqueOffers.map((offer) => (
            <CartItem
              offer={offer}
              key={offer.id}
            />
          ))}
          <div className="cart__footer">
            <CartCoupon />
            <CartTotal />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
