import { useState } from 'react';
import { Guitar } from '../../../types/data';
import {
  OfferCard,
  NoOffers,
  ModalCartAdd,
  ModalWrapper
} from '../../components';

type OfferListProps = {
  offerList: Guitar[];
};

function OfferList ({ offerList }: OfferListProps): JSX.Element {

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [currentOffer, setCurrentOffer] = useState<Guitar>(offerList[0]);

  const onModalClose = () => setIsVisibleModal(false);

  const onBuyButtonClick = (offer: Guitar) => {
    setCurrentOffer(offer);
    setIsVisibleModal(true);
  };

  if (!offerList.length) {
    return <NoOffers />;
  }
  return(
    <>
      <div className="cards catalog__cards">
        {
          offerList.map((offer) => (
            <OfferCard
              offer={offer}
              key={offer.id}
              onBuyButtonClick={onBuyButtonClick}
            />
          ))
        }
      </div>
      {
        <ModalWrapper isVisibleChild={isVisibleModal}>
          <ModalCartAdd
            offer={currentOffer}
            isVisible={isVisibleModal}
            onModalClose={onModalClose}
            isOnCatalog
          />
        </ModalWrapper>
      }
    </>
  );
}

export default OfferList;
