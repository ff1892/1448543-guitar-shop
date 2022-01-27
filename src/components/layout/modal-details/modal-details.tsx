import { Guitar } from '../../../types/data';
import {
  getFormattedPrice,
  getFormattedType
} from '../../../utils/common';

type ModalDetailsProps = {
  offer: Guitar,
};

function ModalDetails ( { offer }: ModalDetailsProps): JSX.Element {

  const {
    previewImg,
    type,
    name,
    vendorCode,
    stringCount,
    price,
  } = offer;

  const formattedType = getFormattedType(type);
  const formattedPrice = getFormattedPrice(price);

  return (
    <div className="modal__info">
      <img
        className="modal__img"
        src={`../${previewImg}`}
        alt={name}
        width="67"
        height="137"
      />
      <div className="modal__info-wrapper">
        <h3 className="modal__product-name title title--little title--uppercase">
          Гитара {name}
        </h3>
        <p className="modal__product-params modal__product-params--margin-11">
          Артикул: {vendorCode}
        </p>
        <p className="modal__product-params">
          {formattedType}, {stringCount} струнная
        </p>
        <p className="modal__price-wrapper">
          <span className="modal__price">Цена:</span>
          <span className="modal__price">{formattedPrice}</span>
        </p>
      </div>
    </div>
  );
}

export default ModalDetails;
