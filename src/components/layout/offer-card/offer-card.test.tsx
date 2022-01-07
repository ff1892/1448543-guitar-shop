import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { screen, render } from '@testing-library/react';
import OfferCard from './offer-card';
import { makeFakeGuitar } from '../../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});


describe('Component: OfferCard', () => {
  const fakeGuitar = makeFakeGuitar();
  const fakeOffer = (
    <Provider store={store}>
      <Router history={history}>
        <OfferCard offer={fakeGuitar} />;
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeOffer);
    expect(screen.getByTestId(/offer card/i)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeGuitar.name}`)).toBeInTheDocument();
  });
});
