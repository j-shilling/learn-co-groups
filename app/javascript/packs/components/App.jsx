import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const NoMatch = () => <h1>Route Not Found!!</h1>;

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
