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

  const { initialStep, commentsToShow } = commentsSettings;
  const [step, setStep] = useState(initialStep);
  const visibleCommentsCount = step * commentsToShow;
  const visibleComments = comments.slice(0, visibleCommentsCount);
  const isButtonShown = visibleCommentsCount < comments.length;

  const onMoreButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };


  return (
    <>
      <section className="reviews">
        <h3 className="reviews__title title title--bigger">
        Отзывы
        </h3>
        <a className="button button--red-border button--big reviews__sumbit-button" href="#">
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
      <ModalComment />
    </>
  );
}

export default CommentList;
