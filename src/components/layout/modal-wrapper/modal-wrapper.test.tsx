import { render, screen } from '@testing-library/react';
import ModalWrapper from './modal-wrapper';

const fakeChild = <button />;

describe('Component: ModalWrapper', () => {

  const fakeModalWrapper = (
    <ModalWrapper isVisibleChild>
      {fakeChild}
    </ModalWrapper>
  );

  it('should render correctly', () => {
    render(fakeModalWrapper);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
