import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import Home from '../containers/Home';
import Auth from '../containers/Auth';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/home" component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
