import { render, screen } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Footer from './footer';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const view = (
      <Provider store={store}>
        <Router history={history}>
          <Footer />
        </Router>
      </Provider>
    );
    render(view);
    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    const view = (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path='/' exact>
              <h1>This is a main page</h1>
            </Route>
            <Route>
              <Footer />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
    render(view);

    expect(screen.queryByText(/This is a main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText(/Логотип/i));
    expect(screen.getByText(/This is a main page/i)).toBeInTheDocument();
  });
});
