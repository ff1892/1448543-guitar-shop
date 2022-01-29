import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { screen, render } from '@testing-library/react';
import CartItem from './cart-item';
import { makeFakeGuitar } from '../../../utils/mocks';
import userEvent from '@testing-library/user-event';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const fakeOffer = makeFakeGuitar();
const { name, vendorCode } = fakeOffer;


const fakeCallback = jest.fn();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA_CART: {
    cartOffers: [fakeOffer],
  },
});


describe('Component: CartItem', () => {

  const fakeCartItem = (
    <Provider store={store}>
      <CartItem
        offer={fakeOffer}
        onModalOpen={fakeCallback}
      />;
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCartItem);
    expect(screen.getByText(new RegExp(name))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(vendorCode))).toBeInTheDocument();
  });

  it('should run callback when click on cross button', () => {
    render(fakeCartItem);
    userEvent.click(screen.getByLabelText(/Удалить/i));
    expect(fakeCallback).toBeCalled();
  });
});
