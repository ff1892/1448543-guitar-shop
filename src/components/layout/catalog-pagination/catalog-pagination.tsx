import { Link, useHistory, useParams } from 'react-router-dom';
import { MouseEvent, useState } from 'react';
import { OFFERS_TO_SHOW, AppRoute } from '../../../constants';
import useQuery from '../../../hooks/use-query/use-query';

const pagintationSettings = {
  offersToShow: OFFERS_TO_SHOW,
  linksToShow: 3,
  initialPage: 1,
  initialStep: 1,
};

const {
  offersToShow,
  linksToShow,
  initialStep,
} = pagintationSettings;

type PaginationProps = {
  offers: number,
};

function CatalogPagination ({ offers }: PaginationProps): JSX.Element {
  const history = useHistory();
  const queryUrl = useQuery();
  const { query } = useParams<{ query: string }>();
  const [step, setStep] = useState<number>(initialStep);

  const totalPages = Math.ceil(offers / offersToShow);
  const maxStep = Math.ceil(totalPages / linksToShow);

  const sectionPages = new Array(linksToShow)
    .fill(null).map((_value, index) => (linksToShow * (step - 1) + index + 1))
    .filter((pageItem) => pageItem <= totalPages);

  const onPageClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    const currentPageNumber = parseInt(evt.currentTarget.innerText, 10);
    history.push({ pathname: `page_${currentPageNumber}`, search: queryUrl.toString() });
  };

  const onPrevClick = (): void => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNextClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };


  return (
    <div className="pagination page-content__pagination" data-testid="pagination">
      <ul className="pagination__list">
        { step !== initialStep &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link className="link pagination__page-link"
              to='/'
              onClick={onPrevClick}
            >
              Назад
            </Link>
          </li> }
        {
          sectionPages.map((pageNumber) => (
            <li className={`pagination__page ${pageNumber === parseInt(query, 10) ? 'pagination__page--active': ''}`}
              key={pageNumber}
            >
              <Link
                className="link pagination__page-link"
                to={`${AppRoute.Catalog}${pageNumber}`}
                onClick={onPageClick}
                data-testid={`page ${pageNumber}`}
              >
                {pageNumber}
              </Link>
            </li>
          ))
        }
        { step !== maxStep &&
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link"
              to='/'
              onClick={onNextClick}
            >
            Далее
            </Link>
          </li> }
      </ul>
    </div>
  );
}

export default CatalogPagination;
