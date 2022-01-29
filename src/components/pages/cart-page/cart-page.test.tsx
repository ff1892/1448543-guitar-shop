import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';

import { screen, render } from '@testing-library/react';
import CartPage from './cart-page';
import { makeFakeGuitar } from '../../../utils/mocks';
import { INITIAL_DISCOUNT, UploadStatus } from '../../../constants';

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
  DATA_COUPON: {
    discount: INITIAL_DISCOUNT,
    coupon: null,
    couponStatus: UploadStatus.Unknown,
  },
  DATA_OFFERS: {
    similiarOffers: [fakeGuitar],
    isSimiliarOffersLoaded: true,
    isSimiliarOffersError: false,
  },
});


describe('Component: CartPage', () => {

  const fakeCartPage = (
    <Provider store={store}>
      <Router history={history}>
        <CartPage />;
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeCartPage);
    expect(screen.getByTestId(/cart-page/i)).toBeInTheDocument();
  });
});
