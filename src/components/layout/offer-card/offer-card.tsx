import { Link } from 'react-router-dom';
import { getFormattedPrice } from '../../../utils/common';
import { Guitar } from '../../../types/data';
import { StarsRating } from '../../components';
import { AppRoute } from '../../../constants';

type OfferCardProps = {
  offer: Guitar,
};

function OfferCard({ offer }: OfferCardProps): JSX.Element {

  const {
    id,
    previewImg,
    name,
    rating,
    price,
    comments,
  } = offer;

  const formattedPrice = getFormattedPrice(price);

  return(
    <div className="product-card" data-testid='offer card'>
      <img src={`../${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <StarsRating rating={rating} />
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
        <Link className="button button--red button--mini button--add-to-cart" to={AppRoute.Cart}>
          Купить
        </Link>
      </div>
    </div>
  );
}

export default OfferCard;
