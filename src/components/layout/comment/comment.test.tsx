import Comment from './comment';
import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../../utils/mocks';

const fakeCommentGet = makeFakeComment();
const { userName, advantage, disadvantage, comment } = fakeCommentGet;

describe('Component: Comment', () => {
  const fakeComment = <Comment userComment={fakeCommentGet} />;

  it('should render correctly', () => {
    render(fakeComment);
    expect(screen.getByText(new RegExp(userName))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(advantage))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(disadvantage))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(comment))).toBeInTheDocument();
  });
});
