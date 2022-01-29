import OfferDetails from './offer-details';
import { render, screen } from '@testing-library/react';
import { makeFakeGuitar } from '../../../utils/mocks';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const fakeGuitar = makeFakeGuitar();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  DATA_CART: {
    cartOffers: [fakeGuitar],
  },
});

describe('Component: OfferDetails', () => {

  const FakeOfferDetails = (
    <Provider store={store}>
      <Router history={history}>
        <OfferDetails offer={fakeGuitar} />
      </Router>
    </Provider>);

  it('should render correctly', () => {
    render(FakeOfferDetails);
    expect(screen.getAllByAltText(new RegExp(fakeGuitar.name))).toHaveLength(2);
    expect(screen.getAllByText(/Цена:/i)).toHaveLength(2);
    expect(screen.getAllByText(/Добавить в корзину/i)).toHaveLength(2);
  });
});
