import { Guitar } from '../../../types/data';
import { sortCommentsByDate } from '../../../utils/common';
import { AppRoute, INITIAL_PAGE } from '../../../constants';

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
      { label: 'Главная', link: AppRoute.Main },
      { label: 'Каталог', link: `${AppRoute.Catalog}${AppRoute.Page}${INITIAL_PAGE}` },
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
