import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import { Sort } from '../../../types/components';
import { getSortQuery } from '../../../utils';
import {
  getAllOffers,
  getAllOffersIsLoaded,
  getAllOffersError
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

  const [sort, setSort] = useState<Sort>({ type: '', order: '' });
  const sortQuery = getSortQuery(sort);


  const allOffers = useSelector(getAllOffers).slice(0, 9);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);
  const isError = useSelector(getAllOffersError);
  const dispatch = useDispatch();

  const onSortChange = (currentSort: Sort) => {
    setSort(currentSort);
  };

  useEffect(() => {
    dispatch(fetchAllOffersAction(sortQuery));
  }, [dispatch, sortQuery]);


  return (
    <ErrorWrapper isError={isError}>
      <div className="catalog" >
        <CatalogSort onSortChange={onSortChange}/>
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
