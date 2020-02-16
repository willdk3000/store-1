import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import surveySent from './surveys/surveySent';
import Auth from '../containers/Auth';
import { SurveyForm } from '../containers/SurveyForm';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/newSurvey" component={SurveyForm} />
    <Route path="/surveySent" component={surveySent} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
