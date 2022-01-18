import {
  ChangeEvent,
  Fragment,
  useState
} from 'react';
import { MAX_RATING } from '../../../constants';
import { useSelector } from 'react-redux';
import { getCurrentOffer } from '../../../store/reducers/data-current-offer/selectors';

const ratingLabel: { [key: string]: string } = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

const ratingArray: number[] = new Array(MAX_RATING).fill(null).map((_value, index) => MAX_RATING - index);

function ModalComment (): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rating, setRating] = useState<number>(0);

  const onRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
  };

  const currentOffer = useSelector(getCurrentOffer);

  return (
    <div className="modal is-active modal--review modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal="">
        </div>
        <div className="modal__content">
          <h2 className="modal__header modal__header--review title title--medium">
              Оставить отзыв
          </h2>
          <h3 className="modal__product-name title title--medium-20 title--uppercase">
            {currentOffer?.name}
          </h3>
          <form className="form-review">
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">
                  Ваше Имя
                </label>
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                <span className="form-review__warning">
                  Заполните поле
                </span>
              </div>
              <div>
                <span className="form-review__label form-review__label--required">
                  Ваша Оценка
                </span>
                <div className="rate rate--reverse">
                  { ratingArray.map((mark) => (
                    <Fragment key={mark}>
                      <input className="visually-hidden"
                        name="rate"
                        type="radio"
                        id={`star-${mark}`}
                        value={mark}
                        onChange={onRatingChange}
                      />
                      <label
                        className="rate__label"
                        htmlFor={`star-${mark}`}
                        title={ratingLabel[mark]}
                      />
                    </Fragment>
                  ))}
                  <span className="rate__count"></span>
                  <span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">
              Достоинства
            </label>
            <input className="form-review__input" id="pros" type="text" autoComplete="off" />
            <label className="form-review__label" htmlFor="user-name">
              Недостатки
            </label>
            <input className="form-review__input" id="user-name" type="text" autoComplete="off" />
            <label className="form-review__label" htmlFor="user-name">
              Комментарий
            </label>
            <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off">
            </textarea>
            <button className="button button--medium-20 form-review__button" type="submit">
              Отправить отзыв
            </button>
          </form>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon">
            </span>
            <span className="modal__close-btn-interactive-area">
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalComment;
