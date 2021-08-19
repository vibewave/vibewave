import React from 'react'
import { Route, Switch} from 'react-router-dom';
import Home from './components/Home';

/**
 * COMPONENT
 */
const Routes = () => {
    return (
      <Switch>
        <Route component={Home} />
      </Switch>
    )
}

export default Routes;
