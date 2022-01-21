import OfferTabs  from './offer-tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeGuitar } from '../../../utils/mocks';

describe('Component: ButtonCross', () => {

  const fakeGuitar = makeFakeGuitar();
  const FakeOfferTabs = <OfferTabs offer={fakeGuitar} />;

  it('should render correctly', () => {
    render(FakeOfferTabs);
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
  });

  it('render characteristics as initial state', () => {
    render(FakeOfferTabs);
    expect(screen.getByText(fakeGuitar.vendorCode)).toBeInTheDocument();
  });
  it('render description by clicking on description tab', () => {
    render(FakeOfferTabs);
    userEvent.click(screen.getByText(/Описание/i));
    expect(screen.getByText(fakeGuitar.description)).toBeInTheDocument();
  });
  it('render characteristics by clicking on characteristics tab', () => {
    render(FakeOfferTabs);
    userEvent.click(screen.getByText(/Описание/i));
    userEvent.click(screen.getByText(/Характеристики/i));
    expect(screen.getByText(fakeGuitar.vendorCode)).toBeInTheDocument();
  });
});
