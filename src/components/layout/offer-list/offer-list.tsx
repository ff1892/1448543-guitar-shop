import { Guitar } from '../../../types/data';
import { OfferCard } from '../../components';

type OfferListProps = {
  offerList: Guitar[];
};

function GuitarList ({ offerList }: OfferListProps): JSX.Element {
  return(
    <div className="cards catalog__cards">
      {
        offerList.map((offer) => (
          <OfferCard offer={offer} key={offer.id} />
        ))
      }
    </div>
  );
}

export default GuitarList;
