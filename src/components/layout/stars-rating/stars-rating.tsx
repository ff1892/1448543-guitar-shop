import { MAX_RATING } from '../../../constants';

type starsRatingProps = {
  rating: number,
};

function StarsRating({ rating }: starsRatingProps): JSX.Element {

  const roundedRating = Math.round(rating);

  const starsData = new Array(MAX_RATING).fill(null)
    .map((_value, index) => ({
      grade: index + 1,
      id: index + 1,
    }));

  return(
    <>
      <span className="visually-hidden">Рейтинг:</span>
      { starsData.map(({ id, grade}) => (
        <svg width="12" height="11" aria-hidden="true" key={id}>
          <use
            xlinkHref={roundedRating >= grade ? '#icon-full-star' : '#icon-star'}
          >
          </use>;
        </svg>
      ))}
    </>
  );
}

export default StarsRating;
