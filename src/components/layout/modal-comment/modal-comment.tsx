/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useState
} from 'react';
import { MAX_RATING } from '../../../constants';
import { useSelector } from 'react-redux';
import { getCurrentOffer } from '../../../store/reducers/data-current-offer/selectors';
import { useRef } from 'react';

type ModalCommentProps = {
  isVisible: boolean,
  closeModal: () => void;
};

const ratingLabel: { [key: string]: string } = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

const ratingArray: number[] = new Array(MAX_RATING).fill(null).map((_value, index) => MAX_RATING - index);

function ModalComment({ isVisible, closeModal }: ModalCommentProps): JSX.Element {

  const [rating, setRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidRating, setIsValidRating] = useState<boolean>(true);
  const validUserName = userName.trim() !== '';
  const validRating = rating !== 0;

  const prosRef = useRef<HTMLInputElement | null>(null);
  const consRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const isRefsValid = prosRef.current
    && consRef.current &&commentRef.current;

  const validateName = () => {
    if (!validUserName) {
      setIsValidName(false);
      return;
    }
    setIsValidName(true);
  };

  const validateRating = () => {
    if (!validRating) {
      setIsValidRating(false);
      return;
    }
    setIsValidRating(true);
  };

  const onUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.currentTarget.value);
    if (evt.currentTarget.value.trim().length) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

  const onRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(evt.target.value, 10));
    setIsValidRating(true);
  };


  const onFormSumbit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    validateName();
    validateRating();
    if (!validRating || !validUserName) {
      return;
    }
    // eslint-disable-next-line no-alert
    alert();
  };

  const currentOffer = useSelector(getCurrentOffer);

  return (
    <div
      className={`modal modal--review modal-for-ui-kit ${isVisible ? 'is-active ' : ''}`}
    >
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
          <form
            className="form-review"
            onSubmit={onFormSumbit}
          >
            <div className="form-review__wrapper">
              <div className="form-review__name-wrapper">
                <label className="form-review__label form-review__label--required" htmlFor="user-name">
                  Ваше Имя
                </label>
                <input
                  className="form-review__input form-review__input--name"
                  id="user-name"
                  type="text"
                  autoComplete="off"
                  value={userName}
                  onChange={onUserNameChange}
                />
                { !isValidName &&
                   <span className="form-review__warning">
                   Заполните поле
                   </span> }
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
                        checked={rating === mark}
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
                  { !isValidRating &&
                    <span className="rate__message">Поставьте оценку</span> }
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="pros">
              Достоинства
            </label>
            <input
              className="form-review__input"
              id="pros"
              type="text"
              autoComplete="off"
              ref={prosRef}
            />
            <label className="form-review__label" htmlFor="cons">
              Недостатки
            </label>
            <input
              className="form-review__input"
              id="cons"
              type="text"
              autoComplete="off"
              ref={consRef}
            />
            <label className="form-review__label" htmlFor="comment">
              Комментарий
            </label>
            <textarea
              className="form-review__input form-review__input--textarea"
              id="comment"
              rows={10}
              autoComplete="off"
              ref={commentRef}
            >
            </textarea>
            <button className="button button--medium-20 form-review__button" type="submit">
              Отправить отзыв
            </button>
          </form>
          <button
            className="modal__close-btn button-cross"
            type="button"
            aria-label="Закрыть"
            onClick={() => closeModal()}
          >
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
