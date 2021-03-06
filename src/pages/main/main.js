import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../../components/navbar';

import User from '../user';

class Main extends React.Component {

  render() {
    const { t, i18n } = this.props;

    return <section>
      <header className="app-header pt-3">
        <Navbar />
      </header>
      <main className="app-body">
        <User t={ t } i18n={ i18n } />
      </main>
    </section>
  }
}

PropTypes.LandingPage = {
  t: PropTypes.func,
}

export default Main;
