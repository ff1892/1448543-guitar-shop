import { screen, render } from '@testing-library/react';
import NoOffers from './no-offers';

describe('Component: NoOffers', () => {
  const fakeNoOffers = <NoOffers />;

  it('should render correctly', () => {
    render(fakeNoOffers);
    expect(screen.getByText(/Ничего не нашлось/i)).toBeInTheDocument();
  });
});
