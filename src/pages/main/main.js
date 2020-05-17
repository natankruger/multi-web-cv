import React from 'react';

import Navbar from '../../components/navbar';
import Biography from '../../components/biography';
import Skills from '../../components/skills';
import TimeLine from '../../components/timeline';
import Contact from '../../components/contact';

class Main extends React.Component {

  render() {
    const t = this.props.t;

    return <section>
      <header className="app-header pt-3">
        <Navbar />
      </header>
      <main className="app-body">
        <Contact />
        <Biography bio={t('biograpy-description')} />
        <Skills t={t.bind(this)} />
        <TimeLine t={t.bind(this)} />
      </main>
    </section>
  }
}

export default Main;
