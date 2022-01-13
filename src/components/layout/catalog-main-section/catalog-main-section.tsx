import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction, fetchPriceOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { getSort } from '../../../store/reducers/state-sort/selectors';
import { getFilterPrice } from '../../../store/reducers/state-filter/selectors';
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

import useQuery from '../../../hooks/use-query/use-query';
import { useParams } from 'react-router-dom';

function CatalogMainSection(): JSX.Element {

  const dispatch = useDispatch();
  const queryUrl = useQuery();

  const { query } = useParams<{ query: string }>();
  const page = parseInt(query, 10);

  const sort = useSelector(getSort);
  const price = useSelector(getFilterPrice);

  const types = queryUrl.getAll('type');
  const strings = queryUrl.getAll('stringCount');

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
  }, [dispatch, allDataQuery, historyQuery, priceDispatchQuery]);

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
