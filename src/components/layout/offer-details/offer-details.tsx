import './style.css';
import { useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { AppRoute, OrderCount } from '../../../constants';
import { Guitar } from '../../../types/data';
import { getFormattedPrice, getSameOffersCount } from '../../../utils/common';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';

import {
  StarsRating,
  OfferTabs,
  ModalCartAdd,
  ModalWrapper
} from '../../components';
import { Link } from 'react-router-dom';

type OfferDetailsProps = {
  offer: Guitar,
};

enum IconParam {
  Width = 14,
  Height = 14,
}

function OfferDetails ({ offer }: OfferDetailsProps): JSX.Element {

  const {
    previewImg,
    name,
    rating,
    comments,
    price,
  } = offer;

  const offersInCart = useSelector(getOffersInCart);
  const sameOffersCount = getSameOffersCount(offersInCart, offer.id);
  const isMaxCount = sameOffersCount === OrderCount.Max;

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const onModalClose = () => setIsVisibleModal(false);

  const onBuyButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsVisibleModal(true);
  };

  const commentsCount = comments.length;
  const formattedPrice = getFormattedPrice(price);

  return (
    <>
      <div className="product-container">
        <img className="product-container__img"
          src={`../${previewImg}`}
          width="90" height="235" alt={name}
        />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
          <div className="rate product-container__rating" aria-hidden="true">
            <StarsRating
              rating={rating}
              width={IconParam.Width}
              height={IconParam.Height}
            />
            <span className="rate__count">{commentsCount}</span>
            <span className="rate__message"></span>
          </div>
          <OfferTabs offer={offer}/>
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">
            {formattedPrice}
          </p>
          <a
            className={`button button--red button--big product-container__button
              ${isMaxCount ? 'button--out-of-stock' : '' }`}
            href={AppRoute.Cart}
            onClick={onBuyButtonClick}
          >
            {isMaxCount ? 'Товар закончился' : 'Добавить в корзину'}
          </a>
          {isMaxCount &&
            <Link className='out-of-stock__warning' to={AppRoute.Cart}>
              <span>
            В вашей корзине сейчас {sameOffersCount} шт., <br/>
            доступных для заказа
              </span>
            </Link>}
        </div>
      </div>
      {
        <ModalWrapper isVisibleChild={isVisibleModal}>
          <ModalCartAdd
            offer={offer}
            isVisible={isVisibleModal}
            onModalClose={onModalClose}
          />
        </ModalWrapper>
      }
    </>
  );
}

export default OfferDetails;
