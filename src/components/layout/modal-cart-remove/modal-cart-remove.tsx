import { useEffect, useCallback, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Guitar } from '../../../types/data';
import { ButtonCross, ModalDetails } from '../../components';
import { removeSameCartOffers } from '../../../store/actions';

type ModalCartRemoveProps = {
  offer: Guitar,
  isVisibleModal: boolean,
  onModalClose: () => void,
};

function ModalCartRemove ({ offer, onModalClose, isVisibleModal }: ModalCartRemoveProps): JSX.Element {

  const dispatch = useDispatch();

  const onDeleteButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(removeSameCartOffers(offer));
    onModalClose();
  };

  const onEscKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        onModalClose();
      }
    }, [onModalClose]);

  useEffect(() => {
    if (isVisibleModal) {
      document.addEventListener('keydown', onEscKeyDown);
    }
    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown, isVisibleModal]);


  return (
    <div
      className={`modal modal-for-ui-kit ${isVisibleModal ? 'is-active': ''}`}
      data-testid="modal"
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" data-close-modal onClick={onModalClose}>
        </div>
        <div className="modal__content">
          <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
          <ModalDetails offer={offer} />
          <div className="modal__button-container">
            <button
              data-testid="delete-button"
              className="button button--small modal__button"
              onClick={onDeleteButtonClick}
            >
              Удалить товар
            </button>
            <button
              data-testid="continue-button"
              className="button button--black-border button--small modal__button modal__button--right"
              onClick={onModalClose}
            >
              Продолжить покупки
            </button>
          </div>
          <ButtonCross onButtonClick={onModalClose} />
        </div>
      </div>
    </div>
  );
}

export default ModalCartRemove;
