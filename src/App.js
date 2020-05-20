import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';
import Register from './pages/register';

import { UserContext } from './services/auth';

import 'bootstrap';
import './styles/application.scss';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);

  return <Route {...rest}
         render={ props => !!auth.user ? (
          <Component { ...props } />
         ) : (
          <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
         ) }
  />
};

const AuthRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(UserContext);

  return <Route {...rest}
         render={ props => !auth.user ? (
          <Component { ...props } />
         ) : (
          <Redirect to={ { pathname: '/', state: { from: props.location } } } />
         ) }
  />
};

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={ () => <Main t={t.bind(this)} /> } />
        <AuthRoute exact path="/login" component={ () => <Login /> } />
        <AuthRoute exact path="/register" component={ () => <Register /> }  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
