import { getFormattedPrice } from '../../../utils';
import { Guitar } from '../../../types/data';
import { StarsRating } from '../../components';

type OfferCardProps = {
  offer: Guitar,
};

function OfferCard({ offer }: OfferCardProps): JSX.Element {

  const {
    previewImg,
    name,
    rating,
    price,
    comments,
  } = offer;

  const formattedPrice = getFormattedPrice(price);

  return(
    <div className="product-card">
      <img src={previewImg} width="75" height="190" alt="СURT Z30 Plus Acoustics" />
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
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default OfferCard;
