import { Route, IndexRoute } from 'react-router';
import React from 'react';

import {
  Wireframe,
  Twitts,
  Configuration,
  NotFound
 } from './pages';

export default () => {
  return (
      <Route path="/" component={Wireframe}>
        <IndexRoute component={Twitts} />
        <Route path="twitts" component={Twitts}/>
        <Route path="configuration" component={Configuration}/>
        <Route path="*" component={NotFound}/>
      </Route>
    );
};
