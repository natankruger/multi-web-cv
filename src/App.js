import React from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from './components/navbar';
import Biography from './components/biography';
import Skills from './components/skills';
import TimeLine from './components/timeline';

import 'bootstrap';
import './styles/application.scss';

function App() {
  const { t } = useTranslation();


  return (
    <section>
      <header className="app-header pt-3">
        <Navbar />
      </header>
      <main className="app-body">
        <h1>
          {t('construction')}
        </h1>
        <Biography bio={t('biograpy-description')} />
        <Skills />
        <TimeLine t={t.bind(this)} />
      </main>
    </section>
  );
}

export default App;
