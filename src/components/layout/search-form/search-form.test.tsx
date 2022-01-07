import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import SearchForm from './search-form';
import { makeFakeGuitarNoComments } from '../../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SearchForm', () => {
  const fakeGuitar = makeFakeGuitarNoComments();

  const store = mockStore({
    DATA_OFFERS: {
      similiarOffers: [fakeGuitar],
      isSimiliarOffersLoaded: true,
      isSimiliarOffersError: false,
    },
  });

  const fakeSearchForm = (
    <Provider store={store}>
      <Router history={history}>
        <SearchForm />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeSearchForm);
    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
  });

  it('should dispach an action when user types on form', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeSearchForm);

    userEvent.type(screen.getByPlaceholderText(/что вы ищете?/i), 'Guitar');
    jest.useFakeTimers();
    setTimeout(() => {
      expect(dispatch).toBeCalledTimes(1);
    }, 2000);
    jest.clearAllTimers();
  });

  it('should show search query and similiar offers', () => {
    render(fakeSearchForm);
    userEvent.type(screen.getByPlaceholderText(/что вы ищете?/i), 'Guitar');
    expect(screen.getByDisplayValue(/Guitar/i)).toBeInTheDocument();
    expect(screen.getByText(`${fakeGuitar.name}`)).toBeInTheDocument();
  });
});
