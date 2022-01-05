import { Link } from 'react-router-dom';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePage } from '../../../store/actions';
import { OFFERS_TO_SHOW, AppRoute } from '../../../constants';

const pagintationSettings = {
  offersToShow: OFFERS_TO_SHOW,
  linksToShow: 3,
  initialPage: 1,
  initialStep: 1,
};

type PaginationProps = {
  offers: number,
};

const {
  offersToShow,
  linksToShow,
  initialPage,
  initialStep,
} = pagintationSettings;

function CatalogPagination ({ offers }: PaginationProps): JSX.Element {
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(initialPage);
  const [step, setStep] = useState<number>(initialStep);

  const totalPages = Math.ceil(offers / offersToShow);
  const maxStep = Math.ceil(totalPages / linksToShow);

  const sectionPages = new Array(linksToShow)
    .fill(null).map((_value, index) => (linksToShow * (step - 1) + index + 1))
    .filter((pageItem) => pageItem <= totalPages);

  const onPageClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    const currentPageNumber = parseInt(evt.currentTarget.innerText, 10);
    setPage(currentPageNumber);
  };

  const onPrevClick = (evt: MouseEvent<HTMLElement>): void => {
    setPage((step - 1) * linksToShow);
    setStep((prevStep) => prevStep - 1);
  };

  const onNextClick = (evt: MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setPage( step * linksToShow + 1);
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    dispatch(changePage(page));
  }, [dispatch, page]);


  return (
    <div className="pagination page-content__pagination">
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
            <li className={`pagination__page ${pageNumber === page ? 'pagination__page--active': ''}`}
              key={pageNumber}
            >
              <Link
                className="link pagination__page-link"
                to={`${AppRoute.Catalog}${pageNumber}`}
                onClick={onPageClick}
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
