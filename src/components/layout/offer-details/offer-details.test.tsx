import OfferDetails from './offer-details';
import { render, screen } from '@testing-library/react';
import { makeFakeGuitar } from '../../../utils/mocks';

const fakeGuitar = makeFakeGuitar();

describe('Component: OfferDetails', () => {

  const FakeOfferDetails = <OfferDetails offer={fakeGuitar} />;
  it('should render correctly', () => {
    render(FakeOfferDetails);
    expect(screen.getByAltText(new RegExp(fakeGuitar.name))).toBeInTheDocument();
    expect(screen.getByText(/Цена:/i)).toBeInTheDocument();
    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
