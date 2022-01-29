import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { Action } from 'redux';
import { screen, render } from '@testing-library/react';
import CartCoupon from './cart-coupon';
import userEvent from '@testing-library/user-event';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const store = mockStore({
  DATA_COUPON: {
    couponStatus: 'UNKNOWN',
  },
});


describe('Component: CartCoupon', () => {

  const fakeCartCoupon = (
    <Provider store={store}>
      <CartCoupon/>;
    </Provider>
  );


  it('should render correctly', () => {
    render(fakeCartCoupon);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
  });
  it('should dispatch an action when send coupon', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCartCoupon);
    userEvent.type(screen.getByRole('textbox'), 'coupon');
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).toBeCalledTimes(1);
  });
  it('should not dispatch an action when textarea is empty', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeCartCoupon);
    userEvent.type(screen.getByRole('textbox'), 'a{backspace}');
    userEvent.click(screen.getByRole('button'));
    expect(dispatch).not.toBeCalled();
  });
});
