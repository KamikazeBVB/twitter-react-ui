import { Route, IndexRoute } from 'react-router';
import React from 'react';

import {
  Wireframe,
  Tweets,
  Configuration,
  NotFound
 } from './pages';

export default () => {
  return (
      <Route path="/" component={Wireframe}>
        <IndexRoute component={Tweets} />
        <Route path="tweets" component={Tweets}/>
        <Route path="configuration" component={Configuration}/>
        <Route path="*" component={NotFound}/>
      </Route>
    );
};
