import { mockOffer } from '../../../mock';
import { sortCommentsByDate } from '../../../utils/common';
import {
  OfferNavigation,
  OfferDetails,
  CommentList
} from '../../components';

function Offer (): JSX.Element {

  const currentOffer = mockOffer;
  const { name, id, comments } = currentOffer;
  const sortedComments = sortCommentsByDate(comments);

  return (
    <main className="page-content">
      <div className="container">
        <OfferNavigation name={name} id={id} />
        <OfferDetails offer={currentOffer}/>
        <CommentList comments={sortedComments} />
      </div>
    </main>
  );
}

export default Offer;
