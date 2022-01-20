import { useState, MouseEvent, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CommentGet } from '../../../types/data';
import { changeCommentStatus } from '../../../store/actions';
import { Comment, ModalComment } from '../../components';
import { UploadStatus } from '../../../constants';

type CommentListProps = {
  comments: CommentGet[],
};

const commentsSettings = {
  initialStep: 1,
  commentsToShow: 3,
};

function CommentList ({comments}: CommentListProps): JSX.Element {

  const dispatch = useDispatch();

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const { initialStep, commentsToShow } = commentsSettings;
  const [step, setStep] = useState<number>(initialStep);

  const visibleCommentsCount = step * commentsToShow;
  const visibleComments = comments.slice(0, visibleCommentsCount);
  const isButtonShown = visibleCommentsCount < comments.length;

  const onMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const onEscKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        closeModal();
        dispatch(changeCommentStatus(UploadStatus.Unknown));
      }
    }, [dispatch]);

  const onPostCommentClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    openModal();
  };

  useEffect(() => {
    if (isVisibleModal) {
      document.addEventListener('keydown', onEscKeyDown);
    }
    return () => document.removeEventListener('keydown', onEscKeyDown);
  }, [onEscKeyDown, isVisibleModal]);


  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">
        Отзывы
        </h3>
        <a
          className="button button--red-border button--big reviews__sumbit-button"
          href="/"
          onClick={onPostCommentClick}
        >
          Оставить отзыв
        </a>
        {
          visibleComments.map((comment) => (
            <Comment key={comment.id} userComment={comment} />
          ))
        }
        { isButtonShown &&
        <button
          className="button button--medium reviews__more-button"
          onClick={onMoreButtonClick}
        >
        Показать еще отзывы
        </button> }
        <a
          className="button button--up button--red-border button--big reviews__up-button"
          href="#top"
        >
        Наверх
        </a>
      </section>
      <ModalComment
        isVisible={isVisibleModal}
        closeModal={closeModal}
      />
    </>
  );
}

export default CommentList;
