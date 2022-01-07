import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { screen, render } from '@testing-library/react';
import OfferList from './offer-list';
import { makeFakeGuitars } from '../../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});


describe('Component: OfferCard', () => {
  const fakeGuitars = makeFakeGuitars();

  const fakeOfferList = (
    <Provider store={store}>
      <Router history={history}>
        <OfferList offerList={fakeGuitars} />;
      </Router>
    </Provider>
  );

  const fakeOfferListNoOffers = (
    <Provider store={store}>
      <Router history={history}>
        <OfferList offerList={[]} />;
      </Router>
    </Provider>
  );

  it('should render correctly with offers', () => {
    render(fakeOfferList);
    expect(screen.getAllByTestId(/offer card/i)).toHaveLength(fakeGuitars.length);
  });

  it('should render correctly without offers', () => {
    render(fakeOfferListNoOffers);
    expect(screen.getByText(/Ничего не нашлось/i)).toBeInTheDocument();
  });
});
