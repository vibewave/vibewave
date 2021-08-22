import React from 'react'
import { Route, Switch} from 'react-router-dom';
import CreateRoom from './components/CreateRoom';
import Home from './components/Home';

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/createroom' component={CreateRoom} />
    </Switch>
  )
}

export default Routes;
