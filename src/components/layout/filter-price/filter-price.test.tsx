import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FilterPrice from './filter-price';
import { makeFakeGuitarsNoComments } from '../../../utils/mocks';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitarsNoComments();
const notMinPrice = (Math.min(...fakeGuitars.map((guitar) => guitar.price)) + 1).toString();

describe('Component: FilterType', () => {

  const store = mockStore({
    DATA_OFFERS: {
      priceOffers: fakeGuitars,
      isPriceOffersLoaded: true,
      isPriceOffersError: false,
    },
    STATE_FILTER: {
      filterType: [],
      filterStrings: [],
      filterPrice: { minPrice: '', maxPrice: '' },
    },
    STATE_PAGE: {
      page: 1,
    },
  });

  const fakeFilterPrice = (
    <Provider store={store}>
      <Router history={history}>
        <FilterPrice />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterPrice);
    expect(screen.getByTestId(/filter price/i)).toBeInTheDocument();
  });

  it('should dispach an action when fetches filter price state', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterPrice);
    expect(dispatch).toBeCalledTimes(1);
  });

  it('should dispach an action when user changes price', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(fakeFilterPrice);
    userEvent.type(screen.getByTestId(/price min/i), `${notMinPrice}`);
    expect(screen.getByDisplayValue(`${notMinPrice}`)).toBeInTheDocument();

    jest.useFakeTimers();
    setTimeout(() => {
      expect(dispatch).toBeCalledTimes(2);
    }, 2000);
    jest.clearAllTimers();
  });
});
