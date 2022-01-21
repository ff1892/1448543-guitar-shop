import { Guitar } from '../../../types/data';
import { sortCommentsByDate } from '../../../utils/common';

import {
  OfferNavigation,
  OfferDetails,
  CommentList
} from '../../components';

type OfferProps = {
  offer: Guitar,
};

function Offer ({ offer }: OfferProps): JSX.Element {

  const { name, id, comments } = offer;
  const sortedComments = sortCommentsByDate(comments);

  return (
    <main className="page-content" data-testid='page-content'>
      <div className="container">
        <OfferNavigation name={name} id={id} />
        <OfferDetails offer={offer}/>
        <CommentList comments={sortedComments} />
      </div>
    </main>
  );
}

export default Offer;
