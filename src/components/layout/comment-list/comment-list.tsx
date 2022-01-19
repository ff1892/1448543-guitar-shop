/* eslint-disable no-console */
import { useState, MouseEvent } from 'react';
import { CommentGet } from '../../../types/data';
import { Comment, ModalComment } from '../../components';

type CommentListProps = {
  comments: CommentGet[],
};

const commentsSettings = {
  initialStep: 1,
  commentsToShow: 3,
};

function CommentList ({comments}: CommentListProps): JSX.Element {

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const { initialStep, commentsToShow } = commentsSettings;
  const [step, setStep] = useState<number>(initialStep);
  const visibleCommentsCount = step * commentsToShow;
  const visibleComments = comments.slice(0, visibleCommentsCount);
  const isButtonShown = visibleCommentsCount < comments.length;

  const onMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const onEscKeyDown = (evt: { code: string; }): void => {
    if (evt.code === 'Escape') {
      closeModal();
    }
  };

  const openModal = () => {
    setIsVisibleModal(true);
    document.addEventListener('keydown', onEscKeyDown);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onPostCommentClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    openModal();
  };


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
