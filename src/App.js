import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';
import { AuthProvider } from './services/auth';

import 'bootstrap';
import './styles/application.scss';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Route exact path="/" >
        <Main t={t.bind(this)} />;
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
