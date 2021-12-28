import { Switch, Route, Redirect } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../pages/main-page/main-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from={AppRoute.Main} to={AppRoute.Catalog}/>
      <Route exact path={`${AppRoute.Catalog}`}>
        <MainPage />
      </Route>
      <Route exact path={`${AppRoute.Catalog}:query`}>
        <MainPage />
      </Route>
    </Switch>
  );
}

export default App;
