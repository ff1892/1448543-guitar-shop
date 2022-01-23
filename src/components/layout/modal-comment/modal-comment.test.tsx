import ModalComment from './modal-comment';
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

describe('Component: CommentList', () => {
  const store = mockStore({
    DATA_CURRENT_OFFER: {
      currentOffer: fakeOffer,
      isCurrentOfferLoaded: true,
      isCurrentOfferError: false,
    },
    DATA_COMMENT: {
      commentStatus: 'UNKNOWN',
    },
  });

  const fakeCallback = jest.fn();

  const fakeModal = (
    <Provider store={store}>
      <Router history={history}>
        <ModalComment isVisible onModalClose={fakeCallback} />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeModal);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(fakeOffer.name))).toBeInTheDocument();
  });
  it('should clear fields when close form', () => {
    render(fakeModal);
    userEvent.type(screen.getByTestId('user-name'), 'FakeName');
    expect(screen.getByTestId('user-name')).toHaveValue('FakeName');
    userEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByTestId('user-name')).toHaveValue('');
  });
  it('should show validation messages when submit an empty form', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeModal);
    userEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText(/Заполните поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();
    expect(dispatch).not.toBeCalled();
  });
  it('should dispatch an action when submit form', async () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeModal);
    userEvent.type(screen.getByTestId('user-name'), 'FakeName');
    userEvent.click(screen.getByTestId('star-1'));
    userEvent.click(screen.getByTestId('submit-button'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
