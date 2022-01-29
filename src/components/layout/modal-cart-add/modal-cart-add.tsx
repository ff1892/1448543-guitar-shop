import { useState, MouseEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addCartOffer } from '../../../store/actions';
import { Guitar } from '../../../types/data';
import { ButtonCross, ModalDetails } from '../../components';
import { AppRoute } from '../../../constants';

enum ModalMode {
  Add = 'Add to cart',
  Succes = 'Success',
}

type ModalCartAddProps = {
  offer: Guitar,
  isVisible: boolean,
  onModalClose: () => void,
  isOnCatalog?: boolean,
};

function ModalCartAdd ({
  offer, isVisible, onModalClose, isOnCatalog }: ModalCartAddProps): JSX.Element {

  const dispatch = useDispatch();
  const history = useHistory();

  const [mode, setMode] = useState<string>(ModalMode.Add);
  const isAddMode = mode === ModalMode.Add;
  const isSuccessMode = mode === ModalMode.Succes;

  const handleModalClose = useCallback(() => {
    onModalClose();
    setMode(ModalMode.Add);
  }, [onModalClose]);

  const onEscKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        handleModalClose();
      }
    }, [handleModalClose]);

  const onAddButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(addCartOffer(offer));
    setMode(ModalMode.Succes);
  };

  const onCartButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleModalClose();
    history.push(AppRoute.Cart);
  };

  const onProceedButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    handleModalClose();
    if (!isOnCatalog) {
      history.push(AppRoute.Start);
    }
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', onEscKeyDown);
    }
    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown, isVisible]);

  return (
    <>
      <div
        className={`modal modal-for-ui-kit ${isVisible && isAddMode ? 'is-active ' : ''}`}
        data-testid="modal"
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal="" onClick={handleModalClose}>
          </div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">
            Добавить товар в корзину
            </h2>
            <ModalDetails offer={offer} />
            <div className="modal__button-container">
              <button
                data-testid="add-cart"
                className="button button--red button--big modal__button modal__button--add"
                type="button"
                onClick={onAddButtonClick}
              >
                Добавить в корзину
              </button>
            </div>
            <ButtonCross onButtonClick={handleModalClose}/>
          </div>
        </div>
      </div>
      <div className={`modal modal--success modal-for-ui-kit ${isVisible && isSuccessMode ? 'is-active ' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={handleModalClose}>
          </div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button
                data-testid="to-cart"
                className="button button--small modal__button"
                type="button"
                onClick={onCartButtonClick}
              >
                Перейти в корзину
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={onProceedButtonClick}
                data-testid="continue"
              >
                Продолжить покупки
              </button>
            </div>
            <ButtonCross onButtonClick={handleModalClose} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalCartAdd;
