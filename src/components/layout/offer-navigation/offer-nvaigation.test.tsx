import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import OfferNavigation from './offer-navigation';
import { makeFakeGuitar } from '../../../utils/mocks';


const history = createMemoryHistory();
const {id, name} = makeFakeGuitar();


describe('Component: OfferNavigation', () => {
  const fakeOfferNavigation  = (
    <Router history={history}>
      <OfferNavigation id={id} name={name} />;
    </Router>
  );

  it('should render correctly', () => {
    render(fakeOfferNavigation);
    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(name))).toHaveLength(2);
  });
});
