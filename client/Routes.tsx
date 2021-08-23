import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import SpotifyLogin from './components/SpotifyLogin';

/**
 * COMPONENT
 */
const Routes = () => {
    return (
      <Switch>
        <Route path="/spotify-login">
          <SpotifyLogin />
        </Route>
        <Route component={Home} />
      </Switch>
    )
}

export default Routes;
