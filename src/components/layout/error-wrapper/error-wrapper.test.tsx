import { render, screen } from '@testing-library/react';
import ErrorWrapper from './error-wrapper';

describe('Component: ErrorWrapper', () => {

  it('should render correctly when is error', () => {
    render(
      <ErrorWrapper isError>
        <p>Child element</p>
      </ErrorWrapper>,
    );
    expect(screen.getByText(/Ошибка загрузки данных/i)).toBeInTheDocument();
    expect(screen.queryByText(/Child element/i)).not.toBeInTheDocument();
  });

  it('should render correctly when is not error', () => {
    render(
      <ErrorWrapper isError={false}>
        <p>Child element</p>
      </ErrorWrapper>,
    );
    expect(screen.getByText(/Child element/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ошибка загрузки данных/i)).not.toBeInTheDocument();
  });
});
