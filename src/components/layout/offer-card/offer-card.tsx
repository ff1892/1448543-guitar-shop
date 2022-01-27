import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFormattedPrice, getIsInCart } from '../../../utils/common';
import { Guitar } from '../../../types/data';
import { AppRoute } from '../../../constants';
import { getOffersInCart } from '../../../store/reducers/data-cart/selectors';
import { StarsRating } from '../../components';

type OfferCardProps = {
  offer: Guitar,
  onBuyButtonClick: (offer: Guitar) => void,
};

enum IconParam {
  Width = 12,
  Height = 11,
}

function OfferCard({ offer, onBuyButtonClick }: OfferCardProps): JSX.Element {

  const {
    id,
    previewImg,
    name,
    rating,
    price,
    comments,
  } = offer;

  const formattedPrice = getFormattedPrice(price);
  const cartOffers = useSelector(getOffersInCart);
  const isInCart = getIsInCart(id, cartOffers);

  const handleBuyButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onBuyButtonClick(offer);
  };

  return(
    <div className="product-card" data-testid='offer card'>
      <img src={`../${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <StarsRating
            rating={rating}
            width={IconParam.Width}
            height={IconParam.Height}
          />
          <span className="rate__count">
            { comments.length }
          </span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice}
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.Guitars}/${id}`}>
          Подробнее
        </Link>
        { isInCart ?
          <Link
            className="button button--red-border button--mini button--in-cart"
            to={AppRoute.Cart}
          >
            В Корзине
          </Link>
          :
          <Link
            className="button button--red button--mini button--add-to-cart"
            to={AppRoute.Cart}
            onClick={handleBuyButtonClick}
          >
            Купить
          </Link> }
      </div>
    </div>
  );
}

export default OfferCard;
