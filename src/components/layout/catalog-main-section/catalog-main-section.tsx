import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction, fetchPriceOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { getSortQuery, getQuery, getPriceQuery, getPageQuery } from '../../../utils';
import { getSort } from '../../../store/reducers/state-sort/selectors';
import { getFilterType, getFilterStrings, getFilterPrice } from '../../../store/reducers/state-filter/selectors';
import { getPage } from '../../../store/reducers/state-page/selectors';
import { QueryRoute, OFFERS_TO_SHOW } from '../../../constants';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../constants';

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

function CatalogMainSection (): JSX.Element {

  const history = useHistory();

  const page = useSelector(getPage);
  const sort = useSelector(getSort);
  const price = useSelector(getFilterPrice);
  const types = useSelector(getFilterType);
  const strings = useSelector(getFilterStrings);

  const pageQuery = getPageQuery(page);
  const sortQuery = getSortQuery(sort);
  const priceQuery = getPriceQuery(price);
  const typeQuery = getQuery(QueryRoute.Type, types);
  const stringsQuery = getQuery(QueryRoute.Strings, strings);

  const filterQuery = [priceQuery, typeQuery, stringsQuery].join('');

  const query = [
    sortQuery,
    ...filterQuery,
    pageQuery,
  ].join('');

  const priceDispatchQuery = [QueryRoute.SortPrice, typeQuery, stringsQuery].join('');

  const totalCount = useSelector(getTotalCount);

  const allOffers = useSelector(getAllOffers);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);
  const isAllOffersError = useSelector(getAllOffersError);
  const isPriceOffersError = useSelector(getPriceOffersError);

  const dispatch = useDispatch();

  const prefix = filterQuery.length ? '?' : '';
  const historyQuery = AppRoute.Catalog + page + prefix + filterQuery;

  useEffect(() => {
    dispatch(fetchAllOffersAction(query));
    dispatch(fetchPriceOffersAction(priceDispatchQuery));
    history.push(historyQuery);
  }, [dispatch, query, historyQuery, priceDispatchQuery, history]);

  return (
    <ErrorWrapper isError={isAllOffersError || isPriceOffersError}>
      <div className="catalog" >
        <CatalogSort />
        <CatalogFilter />
        <LoaderWrapper isLoaded={isAllOffersLoaded}>
          <>
            <OfferList offerList={allOffers} />
            { totalCount > OFFERS_TO_SHOW
              && <CatalogPagination offers={totalCount}/>}
          </>
        </LoaderWrapper>
      </div>
    </ErrorWrapper>
  );
}

export default CatalogMainSection;
