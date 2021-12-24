import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction } from '../../../store/api-actions/data-offers/data-offers';
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
  const allOffers = useSelector(getAllOffers).slice(0, 9);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);
  const isError = useSelector(getAllOffersError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOffersAction());
  }, [dispatch]);


  return (

    <ErrorWrapper isError={isError}>
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
