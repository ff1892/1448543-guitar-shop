import ModalCartAdd from './modal-cart-add';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import { makeFakeGuitar } from '../../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeOffer = makeFakeGuitar();
const fakeCallback = jest.fn();

describe('Component: ModalCartAdd', () => {
  const store = mockStore();

  const fakeModalCartAdd = (
    <Provider store={store}>
      <Router history={history}>
        <ModalCartAdd
          offer={fakeOffer}
          isVisible
          onModalClose={fakeCallback}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeModalCartAdd);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
  it('should dispatch an action when add to cart', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeModalCartAdd);
    userEvent.click(screen.getByTestId('add-cart'));
    expect(dispatch).toBeCalledTimes(1);
  });
  it('should run callback when click on continue button', () => {
    render(fakeModalCartAdd);
    userEvent.click(screen.getByTestId('continue'));
    expect(fakeCallback).toBeCalledTimes(1);
  });
  it('should run callback when click on to-cart button', () => {
    render(fakeModalCartAdd);
    userEvent.click(screen.getByTestId('to-cart'));
    expect(fakeCallback).toBeCalledTimes(1);
  });
});
