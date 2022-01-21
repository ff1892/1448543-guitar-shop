import Offer from './offer';
import { render, screen } from '@testing-library/react';
import { makeFakeGuitar, getFakeStore } from '../../../utils/mocks';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeStore = getFakeStore();
const fakeGuitar = makeFakeGuitar();

describe('Component: Offer', () => {
  const store = mockStore(fakeStore);


  const FakeOffer = (
    <Provider store={store}>
      <Router history={history}>
        <Offer offer={fakeGuitar} />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(FakeOffer);
    expect(screen.getByTestId('page-content')).toBeInTheDocument();
  });
});
