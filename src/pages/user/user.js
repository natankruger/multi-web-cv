import React from 'react';
import PropTypes from 'prop-types';

import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

class User extends React.Component {
  constructor(props) {
    super();
    this.state = {
      edition: false,
    }
  };

  render() {
    const t = this.props.t;

    return <section>
        <Contact />
        <Biography bio={t('biograpy-description')} />
        <Skills t={t.bind(this)} />
        <TimeLine t={t.bind(this)} />
    </section>
  }
}

PropTypes.User = {
  t: PropTypes.func,
  edition: PropTypes.boolean
}

export default User;
