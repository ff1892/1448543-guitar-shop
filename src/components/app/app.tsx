import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../constants';
import MainPage from '../pages/main-page/main-page';

function App(): JSX.Element {
  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <MainPage />
      </Route>
    </Switch>
  );
}

export default App;
