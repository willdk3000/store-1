import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import Auth from '../containers/Auth';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
