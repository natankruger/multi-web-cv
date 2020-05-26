import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Main from './pages/main';
import Login from './pages/login';
import Register from './pages/register';
import LandingPage from './pages/landigPage';
import CvList from './pages/cvList';
// import User from './pages/user';
import PageNotFound from './pages/pageNotFound';

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
        <Route exact path="/landing_page" component={ () => <LandingPage /> } />
        <Route exact path="/list_cv" component={ () => <CvList /> } />

        <Route path="/404" component={ ()=> <PageNotFound /> } />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
