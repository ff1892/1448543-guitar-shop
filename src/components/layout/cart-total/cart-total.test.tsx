import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { screen, render } from '@testing-library/react';
import CartTotal from './cart-total';
import { makeFakeGuitar } from '../../../utils/mocks';
import { UploadStatus } from '../../../constants';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const fakeOffer = makeFakeGuitar();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA_CART: {
    cartOffers: [fakeOffer],
  },
  DATA_COUPON: {
    discount: 0,
    couponStatus: UploadStatus.Posting,
  },
});


describe('Component: CartTotal', () => {

  const fakeCartTotal = (
    <Provider store={store}>
      <CartTotal />;
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCartTotal);
    expect(screen.getByText(/Всего:/i)).toBeInTheDocument();
    expect(screen.getByText(/Скидка:/i)).toBeInTheDocument();
    expect(screen.getByText(/К оплате:/i)).toBeInTheDocument();
  });
  it('submit buttton should be disabled when posting', () => {
    render(fakeCartTotal);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
