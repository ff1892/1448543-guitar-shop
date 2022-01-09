import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { fetchAllOffersAction, fetchPriceOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { getSort } from '../../../store/reducers/state-sort/selectors';
import { getFilterType, getFilterStrings, getFilterPrice } from '../../../store/reducers/state-filter/selectors';
import { getPage } from '../../../store/reducers/state-page/selectors';
import { QueryRoute, OFFERS_TO_SHOW } from '../../../constants';
import { AppRoute } from '../../../constants';

import {
  getSortQuery,
  getQuery,
  getPriceQuery,
  getPageQuery
} from '../../../utils/common';

import {
  getTotalCount,
  getAllOffers,
  getAllOffersIsLoaded,
  getAllOffersError,
  getPriceOffersError
} from '../../../store/reducers/data-offers/selectors';

import {
  CatalogFilter,
  CatalogSort,
  OfferList,
  CatalogPagination,
  LoaderWrapper,
  ErrorWrapper
} from '../../components';

function CatalogMainSection(): JSX.Element {

  const history = useHistory();
  const dispatch = useDispatch();

  const search = useLocation().search;
  const searchTypes = new URLSearchParams(search).getAll('type');

  const page = useSelector(getPage);
  const sort = useSelector(getSort);
  const price = useSelector(getFilterPrice);
  const types = useSelector(getFilterType) || searchTypes;
  const strings = useSelector(getFilterStrings);

  const pageQuery = getPageQuery(page);
  const sortQuery = getSortQuery(sort);
  const priceQuery = getPriceQuery(price);
  const typeQuery = getQuery(QueryRoute.Type, types);
  const stringsQuery = getQuery(QueryRoute.Strings, strings);

  const filterSortQuery = [priceQuery, typeQuery, stringsQuery, sortQuery].join('');
  const allDataQuery = [...filterSortQuery, pageQuery].join('');
  const priceDispatchQuery = [QueryRoute.SortPrice, typeQuery, stringsQuery].join('');

  const totalCount = useSelector(getTotalCount);
  const allOffers = useSelector(getAllOffers);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);
  const isAllOffersError = useSelector(getAllOffersError);
  const isPriceOffersError = useSelector(getPriceOffersError);

  const prefix = filterSortQuery.length ? '?' : '';
  const historyQuery = AppRoute.Catalog + page + prefix + filterSortQuery;


  useEffect(() => {
    dispatch(fetchAllOffersAction(allDataQuery));
    dispatch(fetchPriceOffersAction(priceDispatchQuery));
    history.push(historyQuery);
  }, [dispatch, allDataQuery, historyQuery, priceDispatchQuery, history]);

  return (
    <ErrorWrapper isError={isAllOffersError || isPriceOffersError}>
      <div className="catalog" data-testid="root page">
        <CatalogSort />
        <CatalogFilter />
        <LoaderWrapper isLoaded={isAllOffersLoaded}>
          <>
            <OfferList offerList={allOffers} />
            {totalCount > OFFERS_TO_SHOW
              && <CatalogPagination offers={totalCount} />}
          </>
        </LoaderWrapper>
      </div>
    </ErrorWrapper>
  );
}

export default CatalogMainSection;
