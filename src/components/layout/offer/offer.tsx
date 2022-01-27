import { Guitar } from '../../../types/data';
import { sortCommentsByDate } from '../../../utils/common';
import { AppRoute } from '../../../constants';

import {
  PageNavigation,
  OfferDetails,
  CommentList
} from '../../components';

type OfferProps = {
  offer: Guitar,
};

function Offer ({ offer }: OfferProps): JSX.Element {

  const { name, id, comments } = offer;
  const sortedComments = sortCommentsByDate(comments);

  const { title, linkData } = {
    title: name,
    linkData: [
      { label: 'Главная', link: AppRoute.Start },
      { label: 'Каталог', link: AppRoute.Start },
      { label: name, link: `${AppRoute.Guitars}/${id}` },
    ],
  };

  return (
    <main className="page-content" data-testid='page-content'>
      <div className="container">
        <PageNavigation
          title={title}
          linkData={linkData}
        />
        <OfferDetails offer={offer}/>
        <CommentList comments={sortedComments} />
      </div>
    </main>
  );
}

export default Offer;
