import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { screen, render } from '@testing-library/react';
import { makeFakeGuitar } from '../../../utils/mocks';
import CartItemCounter from './cart-item-counter';
import userEvent from '@testing-library/user-event';

const fakeGuitar = makeFakeGuitar();

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const history = createMemoryHistory();
const store = mockStore({
  DATA_CART: {
    cartOffers: [fakeGuitar],
  },
});


describe('Component: CartItemCounter', () => {

  const fakeCallback = jest.fn();

  const fakeCartItemCounter = (
    <Provider store={store}>
      <Router history={history}>
        <CartItemCounter
          offer={fakeGuitar}
          onDeleteClick={fakeCallback}
        />;
      </Router>
    </Provider>
  );


  it('should render correctly', () => {
    render(fakeCartItemCounter);
    expect(screen.getByTestId(/counter/i)).toBeInTheDocument();
    expect(screen.getByTestId(/2-count/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('should show warning when type wrong gata', () => {
    render(fakeCartItemCounter);
    userEvent.type(screen.getByTestId(/2-count/i), 'text');
    expect(screen.getByText(/Число от 1 до 99/i)).toBeInTheDocument();
  });

  it('should show notification when input contains max count', () => {
    render(fakeCartItemCounter);
    userEvent.type(screen.getByTestId(/2-count/i), '{backspace}99');
    expect(screen.getByText(/Это всё, что есть в наличии/i)).toBeInTheDocument();
  });

  it('should run callback when 1 item in cart and click on decrease buttton', () => {
    render(fakeCartItemCounter);
    userEvent.click(screen.getByLabelText(/Уменьшить количество/i));
    expect(fakeCallback).toBeCalled();
  });

  it('should disable increase buttton when max count', () => {
    render(fakeCartItemCounter);
    userEvent.type(screen.getByTestId(/2-count/i), '{backspace}99');
    userEvent.click(screen.getByLabelText(/Увеличить количество/i));
    expect(screen.getByLabelText(/Увеличить количество/i)).toBeDisabled();
    expect(screen.getByTestId(/2-count/i)).toHaveAttribute('placeholder', '99');
  });

  it('should show min/max value when leaves from wrong input', async () => {
    render(fakeCartItemCounter);
    userEvent.type(screen.getByTestId(/2-count/i), '{backspace}-9');
    userEvent.click(screen.getByLabelText(/Уменьшить количество/i));
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(/2-count/i), '{backspace}100');
    userEvent.click(screen.getByLabelText(/Увеличить количество/i));
    expect(screen.getByText(/99/i)).toBeInTheDocument();
  });
});
