import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

/**
 * COMPONENT
 */
const Routes = () => {
    return (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route component={Home} />
      </Switch>
    )
}

export default Routes;
