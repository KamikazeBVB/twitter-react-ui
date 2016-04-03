import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';

import getRoutes from './routes';

const dest = document.getElementById('content');

const component = (
  <Router history={browserHistory} >
    {getRoutes()}
  </Router>
);

ReactDOM.render(
  component,
  dest
);
