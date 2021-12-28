import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction, fetchPriceOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { getSortQuery, getQuery, getPriceQuery } from '../../../utils';
import { getSort } from '../../../store/reducers/state-sort/selectors';
import { getFilterType, getFilterStrings, getFilterPrice } from '../../../store/reducers/state-filter/selectors';
import { QueryRoute } from '../../../constants';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../../constants';

import {
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

  const sort = useSelector(getSort);
  const price = useSelector(getFilterPrice);
  const types = useSelector(getFilterType);
  const strings = useSelector(getFilterStrings);

  const sortQuery = getSortQuery(sort);
  const priceQuery = getPriceQuery(price);
  const typeQuery = getQuery(QueryRoute.Type, types);
  const stringsQuery = getQuery(QueryRoute.Strings, strings);

  const query = [
    sortQuery,
    priceQuery,
    typeQuery,
    stringsQuery,
  ].join('');

  const priceDispatchQuery = [QueryRoute.SortPrice, typeQuery, stringsQuery].join('');


  const allOffers = useSelector(getAllOffers).slice(0, 9);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);
  const isAllOffersError = useSelector(getAllOffersError);
  const isPriceOffersError = useSelector(getPriceOffersError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOffersAction(query));
    dispatch(fetchPriceOffersAction(priceDispatchQuery));
    const prefix = query.length ? '_?' : '';
    history.push(`${AppRoute.Catalog}${prefix}${query.slice(1)}`);
  }, [dispatch, query, priceDispatchQuery, history]);


  return (
    <ErrorWrapper isError={isAllOffersError || isPriceOffersError}>
      <div className="catalog" >
        <CatalogSort />
        <CatalogFilter />
        <LoaderWrapper isLoaded={isAllOffersLoaded}>
          <>
            <OfferList offerList={allOffers} />
            <CatalogPagination />
          </>
        </LoaderWrapper>
      </div>
    </ErrorWrapper>
  );
}

export default CatalogMainSection;
