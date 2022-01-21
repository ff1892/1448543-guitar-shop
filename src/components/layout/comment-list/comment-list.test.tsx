import CommentList from './comment-list';
import { render, screen } from '@testing-library/react';
import { makeFakeComments, makeFakeGuitar } from '../../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeCommentsNoButton = makeFakeComments(3);
const fakeCommentsButton = makeFakeComments(5);
const fakeOffer = makeFakeGuitar();

describe('Component: CommentList', () => {
  const store = mockStore({
    DATA_CURRENT_OFFER: {
      currentOffer: fakeOffer,
      isCurrentOfferLoaded: true,
      isCurrentOfferError: false,
    },
    DATA_COMMENT: {
      commentStatus: 'UNKNOWN',
    },
  });

  const fakeCommentListNoButtton = (
    <Provider store={store}>
      <Router history={history}>
        <CommentList comments={fakeCommentsNoButton} />
      </Router>
    </Provider>
  );

  const fakeCommentListButtton = (
    <Provider store={store}>
      <Router history={history}>
        <CommentList comments={fakeCommentsButton} />
      </Router>
    </Provider>
  );

  const fakeEmptyList = (
    <Provider store={store}>
      <Router history={history}>
        <CommentList comments={[]} />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCommentListNoButtton);
    expect(screen.getByText(/Отзывы/)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(3);
  });
  it('change header and hide up link when has no comments', () => {
    render(fakeEmptyList);
    expect(screen.getByText(/Отзывов пока нет/i)).toBeInTheDocument();
    expect(screen.queryByTestId('up-link')).not.toBeInTheDocument();
  });
  it('should render additional comments by clicking on show more buttton', () => {
    render(fakeCommentListButtton);
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(3);
    userEvent.click(screen.getByTestId('show-more'));
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(5);
    expect(screen.queryByTestId('show-more')).not.toBeInTheDocument();
  });
});
