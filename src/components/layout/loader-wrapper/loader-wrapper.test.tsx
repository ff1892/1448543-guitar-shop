import { render, screen } from '@testing-library/react';
import LoaderWrapper from './loader-wrapper';

describe('Component: LoaderWrapper', () => {
  it('should render correctly when data is loading', () => {
    render(
      <LoaderWrapper isLoaded={false}>
        <p>Child element</p>
      </LoaderWrapper>,
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('Child element')).not.toBeInTheDocument();
  });

  it('should render correctly if data has been loaded', () => {
    render(
      <LoaderWrapper isLoaded>
        <p>Child element</p>
      </LoaderWrapper>,
    );
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.getByText('Child element')).toBeInTheDocument();
  });
});
