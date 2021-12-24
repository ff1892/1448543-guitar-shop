import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOffersAction } from '../../../store/api-actions/data-offers/data-offers';
import {
  getAllOffers,
  getAllOffersIsLoaded
} from '../../../store/reducers/data-offers/selectors';
import {
  CatalogFilter,
  CatalogSort,
  OfferList,
  CatalogPagination,
  LoaderWrapper
} from '../../components';

function CatalogMainSection (): JSX.Element {
  const allOffers = useSelector(getAllOffers).slice(0, 9);
  const isAllOffersLoaded = useSelector(getAllOffersIsLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllOffersAction());
  }, [dispatch]);


  return (
    <div className = "catalog" >
      <CatalogSort />
      <LoaderWrapper isLoaded={isAllOffersLoaded}>
        <>
          <CatalogFilter />
          <OfferList offerList={allOffers} />
          <CatalogPagination />
        </>
      </LoaderWrapper>
    </div>
  );
}

export default CatalogMainSection;
