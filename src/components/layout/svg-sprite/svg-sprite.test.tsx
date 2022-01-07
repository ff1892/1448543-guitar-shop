import { render, screen } from '@testing-library/react';
import SvgSprite from './svg-sprite';

describe('Component: SvgSprite', () => {
  const fakeSvgSprite  = <SvgSprite />;

  it('should render correctly', () => {
    render(fakeSvgSprite);
    expect(screen.getByTestId(/svg sprite/i)).toBeInTheDocument();
  });
});
