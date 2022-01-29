import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { screen, render } from '@testing-library/react';
import Cart from './cart';
import { makeFakeGuitar } from '../../../utils/mocks';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
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
    couponStatus: 'UNKNOWN',
  },
});

const storeNoOffer = mockStore({
  DATA_CART: {
    cartOffers: [],
  },
  DATA_COUPON: {
    couponStatus: 'UNKNOWN',
  },
});


describe('Component: Cart', () => {

  const fakeCart = (
    <Provider store={store}>
      <Router history={history}>
        <Cart />
      </Router>
    </Provider>
  );

  const fakeCartNoOffer = (
    <Provider store={storeNoOffer}>
      <Router history={history}>
        <Cart />
      </Router>
    </Provider>
  );

  it('should render correctly with offer', () => {
    render(fakeCart);
    expect(screen.getAllByText(new RegExp(fakeOffer.name))).toHaveLength(2);
  });

  it('should render correctly with no offer', () => {
    render(fakeCartNoOffer);
    expect(screen.getByText(/В корзине пока ничего нет/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(fakeOffer.name))).not.toBeInTheDocument();
  });
});
