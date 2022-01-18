import { Guitar } from '../../../types/data';
import {
  StarsRating,
  OfferTabs
} from '../../components';

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

  const commentsCount = comments.length;
  const formattedPrice = price.toLocaleString();

  return (
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
          {formattedPrice} ₽
        </p>
        <a
          className="button button--red button--big product-container__button"
          href="#"
        >
          Добавить в корзину
        </a>
      </div>
    </div>
  );
}

export default OfferDetails;
