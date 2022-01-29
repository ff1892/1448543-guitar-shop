import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import CartEmpty from './cart-empty';

const history = createMemoryHistory();

describe('Component: CartEmpty', () => {

  const fakeCartEmpty = (
    <Router history={history}>
      <CartEmpty />
    </Router>
  );

  it('should render correctly', () => {
    render(fakeCartEmpty);
    expect(screen.getByText(/В корзине пока ничего нет/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
