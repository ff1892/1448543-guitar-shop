import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('Component: StarsRating', () => {
  const fakeStarsRating = <StarsRating rating={5} />;

  it('should render correctly', () => {
    render(fakeStarsRating);
    expect(screen.getByTestId(/stars rating/i)).toBeInTheDocument();
  });
});
