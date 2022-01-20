/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeEvent,
  FormEvent,
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback
} from 'react';
import { MAX_RATING, UploadStatus } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentOffer } from '../../../store/reducers/data-current-offer/selectors';
import { resetInputText, getInputText } from '../../../utils/common';
import { CommentPost } from '../../../types/data';
import { commentPostAction } from '../../../store/api-actions/data-comment/data-comment';
import { fetchCurrentOfferAction } from '../../../store/api-actions/data-current-offer/data-current-offer';
import { getCommentStatus } from '../../../store/reducers/data-comment/selectors';
import { changeCommentStatus } from  '../../../store/actions';
import { ButtonCross } from '../../components';

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

  const currentOffer = useSelector(getCurrentOffer);
  const { guitarId } = useParams<{ guitarId: string }>();
  const commentStatus = useSelector(getCommentStatus);
  const isPosting = commentStatus === UploadStatus.Posting;
  const isCompleted = commentStatus === UploadStatus.Completed;
  const isError = commentStatus === UploadStatus.Error;

  const dispatch = useDispatch();

  const [rating, setRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');

  const [isValidName, setIsValidName] = useState<boolean>(true);
  const [isValidRating, setIsValidRating] = useState<boolean>(true);

  const validUserName = userName.trim() !== '';
  const validRating = rating !== 0;

  const prosRef = useRef<HTMLInputElement | null>(null);
  const consRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

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

  const resetForm = () => {
    setUserName('');
    setRating(0);
    resetInputText(prosRef);
    resetInputText(consRef);
    resetInputText(commentRef);
    setIsValidName(true);
    setIsValidRating(true);
  };

  const getComment = (): CommentPost => ({
    guitarId: currentOffer?.id || 0,
    userName,
    rating,
    advantage: getInputText(prosRef),
    disadvantage: getInputText(consRef),
    comment: getInputText(commentRef),
  });


  const onFormSumbit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    validateName();
    validateRating();
    if (!validRating || !validUserName) {
      return;
    }
    const comment = getComment();
    dispatch(commentPostAction(comment));
  };

  const onModalClose = useCallback(() => {
    closeModal();
    dispatch(changeCommentStatus(UploadStatus.Unknown));
    resetForm();
  }, [closeModal, dispatch]);

  const onEscKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onModalClose();
      }
    }, [onModalClose]);

  useEffect(() => {
    if (isCompleted) {
      dispatch(fetchCurrentOfferAction(guitarId));
      resetForm();
    }
  }, [isCompleted, dispatch, guitarId]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', onEscKeyDown);
    }
    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown, isVisible]);

  return (
    <>
      <div
        className={`modal modal--review modal-for-ui-kit ${isVisible && !isCompleted ? 'is-active ' : ''}`}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal="" onClick={onModalClose}>
          </div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">
              Оставить отзыв
            </h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">
              {currentOffer?.name}
            </h3>
            {isError &&
              <span
                className="form-review__warning"
                style={{
                  textAlign: 'start',
                  fontSize: '13px',
                  lineHeight: '16px',
                  fontWeight: '500',
                }}
              >
                Ошибка. Не удалось отправить данные. <br /> Попробуйте еще раз.
              </span>}
            <form className="form-review"
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
                    disabled={isPosting}
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
                          disabled={isPosting}
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
                disabled={isPosting}
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
                disabled={isPosting}
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
                disabled={isPosting}
              >
              </textarea>
              <button className="button button--medium-20 form-review__button" type="submit">
                {!isPosting ? 'Отправить отзыв' : 'Отправляем...'}
              </button>
            </form>
            <ButtonCross onButtonClick={onModalClose}/>
          </div>
        </div>
      </div>
      <div className={`modal modal--success modal-for-ui-kit ${isVisible && isCompleted ? 'is-active': ''}`}>
        <div className="modal__wrapper">
          <div
            className="modal__overlay" data-close-modal
            onClick={onModalClose}
          >
          </div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button className="button button--small modal__button modal__button--review">К покупкам!</button>
            </div>
            <ButtonCross onButtonClick={onModalClose} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalComment;
