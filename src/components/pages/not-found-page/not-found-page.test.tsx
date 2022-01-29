import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundPage from './not-found-page';
import { AppRoute } from '../../../constants';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>,
    );

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Перейти на главную страницу/i)).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Start} exact>
            <h1>This is a main page</h1>
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/This is a main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.getByText(/This is a main page/i)).toBeInTheDocument();
  });
});
