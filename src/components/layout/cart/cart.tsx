import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute } from '../../../constants';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { Guitar } from '../../../types/data';
import { getUniqueOffers, sortOffersById } from '../../../utils/common';


import {
  PageNavigation,
  CartItem,
  CartCoupon,
  CartTotal,
  ModalWrapper,
  ModalCartRemove,
  CartEmpty
} from '../../components';

function Cart (): JSX.Element {

  const { title, linkData } = {
    title: 'Корзина',
    linkData: [
      { label: 'Главная', link: AppRoute.Start},
      { label: 'Каталог', link: AppRoute.Start},
      { label: 'Корзина', link: AppRoute.Cart},
    ],
  };

  const offers = useSelector(getOffersInCart);
  const hasOffers = offers.length > 0;
  const uniqueOffers = getUniqueOffers(offers);
  const sortedOffers = sortOffersById(uniqueOffers);

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [currentOffer, setCurrentOffer] = useState<Guitar>(offers[0]);

  const onModalOpen = (offer: Guitar) => {
    setCurrentOffer(offer);
    setIsVisibleModal(true);
  };

  const onModalClose = () => {
    setIsVisibleModal(false);
  };

  return (
    <main
      className="page-content"
      data-testid="cart-page"

    >
      <div className="container">
        <PageNavigation title={title} linkData={linkData}/>
        { !hasOffers && <CartEmpty /> }
        { hasOffers &&
        <>
          <div className="cart">
            { sortedOffers.map((offer) => (
              <CartItem
                offer={offer}
                key={offer.id}
                onModalOpen={onModalOpen}
              />
            ))}
            <div className="cart__footer">
              <CartCoupon />
              <CartTotal />
            </div>
          </div>
          <ModalWrapper isVisibleChild={isVisibleModal}>
            <ModalCartRemove
              isVisibleModal={isVisibleModal}
              offer = {currentOffer}
              onModalClose={onModalClose}
            />
          </ModalWrapper>
        </> }
      </div>
    </main>
  );
}

export default Cart;
