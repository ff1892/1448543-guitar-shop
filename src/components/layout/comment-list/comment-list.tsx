import { useState, MouseEvent} from 'react';
import { CommentGet } from '../../../types/data';
import { Comment, ModalComment, ModalWrapper } from '../../components';


type CommentListProps = {
  comments: CommentGet[],
};

const commentsSettings = {
  initialStep: 1,
  commentsToShow: 3,
};

function CommentList ({ comments }: CommentListProps): JSX.Element {

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const openModal = () => setIsVisibleModal(true);
  const closeModal = () => setIsVisibleModal(false);

  const { initialStep, commentsToShow } = commentsSettings;
  const [step, setStep] = useState<number>(initialStep);

  const visibleCommentsCount = step * commentsToShow;
  const visibleComments = comments.slice(0, visibleCommentsCount);
  const isButtonShown = visibleCommentsCount < comments.length;

  const hasComments = comments.length > 0;

  const onMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const onPostCommentClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    openModal();
  };

  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">
          {hasComments ? 'Отзывы': 'Отзывов пока нет'}
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
          data-testid='show-more'
        >
        Показать еще отзывы
        </button> }
        { hasComments &&
          <a className="button button--up button--red-border button--big reviews__up-button"
            href="#top"
            data-testid='up-link'
            style={{
              zIndex: '2',
            }}
          >
            Наверх
          </a>}
      </section>
      <ModalWrapper isVisibleChild={isVisibleModal}>
        <ModalComment
          isVisible={isVisibleModal}
          closeModal={closeModal}
        />
      </ModalWrapper>
    </>

  );
}

export default CommentList;
