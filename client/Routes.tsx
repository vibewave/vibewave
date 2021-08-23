import React from 'react'
import { Route, Switch} from 'react-router-dom';
import CreateRoom from './components/CreateRoom';
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
        <Route exact path='/createroom'>
          <CreateRoom />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    )
}

export default Routes;
