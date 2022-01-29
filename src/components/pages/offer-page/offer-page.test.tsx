import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createApi } from '../../../services/api';
import { State } from '../../../types/state';
import { makeFakeGuitar, getFakeStore } from '../../../utils/mocks';
import OfferPage from './offer-page';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeGuitar();
const fakeStore = getFakeStore();

describe('Component: PageOffer', () => {

  it('should render correctly passed offer', () => {

    const currentStore = Object.assign(
      {},
      fakeStore,
      {
        DATA_CURRENT_OFFER: {
          currentOffer: fakeOffer,
          isCurrentOfferLoaded: true,
          isCurrentOfferError: false,
        },
        DATA_CART: {
          cartOffers: [fakeOffer],
        },
      },
    );

    const store = mockStore(currentStore);

    const fakeOfferPage = (
      <Provider store={store}>
        <Router history={history}>
          <OfferPage />
        </Router>
      </Provider>);

    render(fakeOfferPage);
    expect(screen.getByText(fakeOffer.vendorCode)).toBeInTheDocument();
  });

  it('should render loader when loading', () => {

    const currentStore = Object.assign(
      {},
      fakeStore,
      {
        DATA_CURRENT_OFFER: {
          currentOffer: fakeOffer,
          isCurrentOfferLoaded: false,
          isCurrentOfferError: false,
        },
      },
    );

    const store = mockStore(currentStore);

    const fakeOfferPage = (
      <Provider store={store}>
        <Router history={history}>
          <OfferPage />
        </Router>
      </Provider>);

    render(fakeOfferPage);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render not found page when error', () => {

    const currentStore = Object.assign(
      {},
      fakeStore,
      {
        DATA_CURRENT_OFFER: {
          currentOffer: fakeOffer,
          isCurrentOfferLoaded: true,
          isCurrentOfferError: true,
        },
      },
    );

    const store = mockStore(currentStore);

    const fakeOfferPage = (
      <Provider store={store}>
        <Router history={history}>
          <OfferPage />
        </Router>
      </Provider>);

    render(fakeOfferPage);
    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти на главную страницу/i)).toBeInTheDocument();
  });

  it('should dispach an actions when fetch data', () => {

    const store = mockStore(fakeStore);

    const fakeOfferPage = (
      <Provider store={store}>
        <Router history={history}>
          <OfferPage />
        </Router>
      </Provider>);

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeOfferPage);
    expect(dispatch).toBeCalledTimes(1);
  });
});
