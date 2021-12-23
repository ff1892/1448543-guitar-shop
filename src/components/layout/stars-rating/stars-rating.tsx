import { MAX_RATING } from '../../../constants';

type starsRatingProps = {
  rating: number,
};

function StarsRating({ rating }: starsRatingProps): JSX.Element {

  const grades = new Array(MAX_RATING).fill(null)
    .map((_value, index) => index + 1);

  const fullStar = <use xlinkHref="#icon-full-star"></use>;
  const emptyStar = <use xlinkHref="#icon-star"></use>;

  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = MAX_RATING - fullStarsCount;

  const fullStarsArray = new Array(fullStarsCount).fill(fullStar);
  const emptyStarsArray = new Array(emptyStarsCount).fill(emptyStar);
  const starsArray = [...fullStarsArray, ...emptyStarsArray];

  const starsRatingArrayWithKey = grades.map((grade, index) => (
    <svg width="12" height="11" aria-hidden="true" key={grade}>
      { starsArray[index] }
    </svg>
  ));

  return(
    <>
      <span className="visually-hidden">Рейтинг:</span>
      { starsRatingArrayWithKey }
    </>
  );
}

export default StarsRating;
