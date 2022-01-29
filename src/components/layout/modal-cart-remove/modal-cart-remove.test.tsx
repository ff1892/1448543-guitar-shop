import ModalCartRemove from './modal-cart-remove';
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

describe('Component: ModalCartRemove', () => {
  const store = mockStore();

  const fakeModalCartRemove = (
    <Provider store={store}>
      <Router history={history}>
        <ModalCartRemove
          offer={fakeOffer}
          isVisibleModal
          onModalClose={fakeCallback}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeModalCartRemove);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(/Удалить товар/i)).toBeInTheDocument();
    expect(screen.getByText(/Продолжить покупки/i)).toBeInTheDocument();
  });
  it('should dispatch an action and run callback when delete', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeModalCartRemove);
    userEvent.click(screen.getByTestId('delete-button'));
    expect(dispatch).toBeCalledTimes(1);
    expect(fakeCallback).toBeCalledTimes(1);
  });
  it('should run callback when click on continue button', () => {
    render(fakeModalCartRemove);
    userEvent.click(screen.getByTestId('continue-button'));
    expect(fakeCallback).toBeCalledTimes(1);
  });
});
