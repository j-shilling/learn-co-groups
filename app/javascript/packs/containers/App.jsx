import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Batches from './Batches';
import Batch from './Batch';

const NoMatch = () => <h1>Route Not Found!!</h1>;

const App = () => {
  const [loginConfirmed, setLoginConfirmed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!loginConfirmed) {
      fetch('/current_user')
        .then((res) => {
          setLoginConfirmed(true);
          if (res.status == 200) {
            res.json().then(user => {
              setCurrentUser(user);
            });
          } else {
            setCurrentUser(null);
          }
        });
    }
  });

  const showRouter = () => {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/batches'>
              <Batches />
            </Route>
            <Route path='/batch/:id'>
              <Batch />
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

  const redirectToLogin = () => {
    return <h1>Not logged in</h1>;
  };

  if (loginConfirmed) {
    if (currentUser) {
      return showRouter();
    } else {
      return redirectToLogin();
    }
  } else {
    return <h1>Waiting for server...</h1>;
  }
};

export default App;
