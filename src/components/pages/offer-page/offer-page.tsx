import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCurrentOfferAction } from '../../../store/api-actions/data-current-offer/data-current-offer';

import {
  getCurrentOffer,
  getIsCurrentOfferLoaded,
  getIsCurrentOfferError
} from '../../../store/reducers/data-current-offer/selectors';

import {
  PageLayout,
  Header,
  Offer,
  Footer,
  Loader
} from '../../components';

import NotFoundPage from '../not-found-page/not-found-page';

function OfferPage (): JSX.Element {

  const dispatch = useDispatch();
  const { guitarId } = useParams<{ guitarId: string }>();

  const fetchCurrentOffer = useCallback(
    (id: string) => dispatch(fetchCurrentOfferAction(id)),
    [dispatch],
  );

  useEffect(() => {
    fetchCurrentOffer(guitarId);
  }, [fetchCurrentOffer, guitarId]);

  const isLoaded = useSelector(getIsCurrentOfferLoaded);
  const isError = useSelector(getIsCurrentOfferError);
  const currentOffer = useSelector(getCurrentOffer);

  if (isError) {
    return <NotFoundPage />;
  }

  if (!currentOffer || !isLoaded) {
    return <Loader isFullPage />;
  }

  return (
    <PageLayout>
      <Header />
      <Offer offer={currentOffer} />
      <Footer />
    </PageLayout>
  );
}

export default OfferPage;
