import { Link, useHistory, useParams } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import { OFFERS_TO_SHOW, AppRoute, HistoryRoute } from '../../../constants';
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
  initialPage,
} = pagintationSettings;

type PaginationProps = {
  offers: number,
};

function CatalogPagination ({ offers }: PaginationProps): JSX.Element {
  const history = useHistory();
  const queryUrl = useQuery();
  const { query } = useParams<{ query: string }>();

  const [page, setPage] = useState<number>(
    query ? parseInt(query, 10) : initialPage);

  const [step, setStep] = useState<number>(initialStep);

  const totalPages = Math.ceil(offers / offersToShow);

  const sectionPages = new Array(linksToShow)
    .fill(null).map((_value, index) => (linksToShow * (step - 1) + index + 1))
    .filter((pageItem) => pageItem <= totalPages);

  const onPageClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    const currentPageNumber = parseInt(evt.currentTarget.innerText, 10);
    setPage(currentPageNumber);
  };

  const onPrevClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (page % linksToShow === 1) {
      setStep((prevStep) => prevStep - 1);
    }
    setPage((prevPage) => prevPage - 1);
  };

  const onNextClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    if (page % linksToShow === 0) {
      setStep((prevStep) => prevStep + 1);
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    history.push({ pathname: `${HistoryRoute.PagePathName}${page}`, search: queryUrl.toString() });
  }, [history, queryUrl, page]);


  return (
    <div className="pagination page-content__pagination" data-testid="pagination">
      <ul className="pagination__list">
        { page !== initialPage &&
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
            <li className={`pagination__page ${pageNumber === page ? 'pagination__page--active': ''}`}
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
        { page !== totalPages &&
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
