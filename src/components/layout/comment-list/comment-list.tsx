import { CommentGet } from '../../../types/data';
import { Comment } from '../../components';

type CommentListProps = {
  comments: CommentGet[],
};

function CommentList ({comments}: CommentListProps): JSX.Element {

  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">
        Оставить отзыв
      </a>
      {
        comments.map((comment) => (
          <Comment key={comment.id} userComment={comment} />
        ))
      }
      <button className="button button--medium reviews__more-button">
        Показать еще отзывы
      </button>
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">
        Наверх
      </a>
    </section>
  );
}

export default CommentList;
