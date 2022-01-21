import ButtonCross from './button-cross';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: ButtonCross', () => {

  const fakeCallback = jest.fn();
  const FakeButton = <ButtonCross onButtonClick={fakeCallback} />;

  it('should render correctly', () => {
    render(FakeButton);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should run callback by clicking the button', () => {
    render(FakeButton);
    userEvent.click(screen.getByRole('button'));
    expect(fakeCallback).toBeCalledTimes(1);
  });
});

