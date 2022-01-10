import * as Redux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import FilterTypeItem from './filter-type-item';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FilterType', () => {

  const store = mockStore();

  const fakeFilterTypeItem = (
    <Provider store={store}>
      <Router history={history}>
        <FilterTypeItem
          label={'fakeLabel'}
          type={'fakeType'}
          disabled={false}
        />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterTypeItem);
    expect(screen.getByText(/fakeLabel/i)).toBeInTheDocument();
  });

  it('should dispach an action when user changes checkbox', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeFilterTypeItem);
    userEvent.click(screen.getByRole('checkbox'));
    expect(dispatch).toBeCalledTimes(1);
  });
});
