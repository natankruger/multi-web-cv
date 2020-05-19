import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';
import Register from './pages/register';

import { UserContext } from './services/auth';


import 'bootstrap';
import './styles/application.scss';

function App() {
  const { t } = useTranslation();
  const auth = useContext(UserContext);
  console.log(auth);

  return (
    <Router>
      { !!auth.user ? <Redirect to={{pathname: "/"}} /> : <Redirect to={{pathname: "/login"}} /> }

      <Route exact path="/" >
        <Main t={t.bind(this)} />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Router>
  );
}

export default App;
