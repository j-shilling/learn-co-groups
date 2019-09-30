import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Batches from './Batches';

const NoMatch = () => <h1>Route Not Found!!</h1>;

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/batches'>
            <Batches />
          </Route>
          <Route exact path='/'>
            <Redirect to='/batches' />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
