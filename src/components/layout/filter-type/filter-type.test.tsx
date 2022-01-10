import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import FilterType from './filter-type';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FilterType', () => {
  const store = mockStore();

  const fakeFilterType = (
    <Provider store={store}>
      <Router history={history}>
        <FilterType />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeFilterType);
    expect(screen.getByTestId(/filter type/i)).toBeInTheDocument();
  });
});
