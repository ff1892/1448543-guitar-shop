import { CommentGet } from '../../../types/data';
import { getDateString } from '../../../utils/common';
import { StarsRating } from '../../components';

type CommentProps = {
  userComment: CommentGet,
};

enum IconParam {
  Width = 16,
  Height = 16,
}

function Comment ({userComment}: CommentProps): JSX.Element {

  const {
    userName,
    createAt,
    rating,
    advantage,
    disadvantage,
    comment,
  } = userComment;

  const foramttedDate = getDateString(createAt);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4>
        <span className="review__date">
          {foramttedDate}
        </span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <StarsRating
          rating={rating}
          width={IconParam.Width}
          height={IconParam.Height}
        />
        <span className="rate__count"></span>
        <span className="rate__message"></span>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">
        {advantage}
      </p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">
        {disadvantage}
      </p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {comment}
      </p>
    </div>
  );
}

export default Comment;
