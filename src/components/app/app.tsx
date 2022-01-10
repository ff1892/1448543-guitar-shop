import { Switch, Route, Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../pages/main-page/main-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from={AppRoute.Main} to={`${AppRoute.Catalog}${AppRoute.Page}`}/>
      <Route exact path={`${AppRoute.Catalog}${AppRoute.Page}`}>
        <MainPage />
      </Route>
      <Route exact path={`${AppRoute.Catalog}${AppRoute.Page}:query`}>
        <MainPage />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
