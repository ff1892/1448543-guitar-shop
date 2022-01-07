import { render, screen } from '@testing-library/react';
import PageLayout from './page-layout';

describe('Component: PageLayout', () => {
  const fakePageLayout = (
    <PageLayout>
      <div>Child element</div>
      <div>Child element</div>
    </PageLayout>
  );

  it('should render correctly', () => {
    render(fakePageLayout);
    expect(screen.getByTestId(/wrapper/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Child element/i)).toHaveLength(2);
  });
});
