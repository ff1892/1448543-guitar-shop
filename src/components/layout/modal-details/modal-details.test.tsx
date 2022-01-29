import { screen, render } from '@testing-library/react';
import { makeFakeGuitar } from '../../../utils/mocks';
import ModalDetails from './modal-details';

const fakeOffer = makeFakeGuitar();
const { name, vendorCode } = fakeOffer;

describe('Component ModalDetails', () => {

  const fakeModalDetails = <ModalDetails offer={fakeOffer}/>;

  it('should render correctly', () => {
    render(fakeModalDetails);
    expect(screen.getByAltText(new RegExp(name))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(vendorCode))).toBeInTheDocument();
    expect(screen.getByText(/Артикул/i)).toBeInTheDocument();
    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
  });
});
