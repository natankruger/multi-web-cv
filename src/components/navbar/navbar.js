import React, { useState } from 'react';
import firebase from '../../services/firebase';

import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("light-app");

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  };

  function changeColorMode(mode) {
    setTheme(mode);
    document.getElementById("cv-app").className = mode
  };

  function languageButton() {
    return (
      i18n.language === "pt_br" ? <button id="eng-btn" onClick={() => { changeLanguage("en_us")} } className="btn btn-outline-secondary">
      English
    </button> : <button id="por-btn" onClick={() => { changeLanguage("pt_br")} } className="btn btn-outline-secondary" >
        Português
      </button>
    )
  };

  function themeButton() {
    return (
      theme === "light-app" ? <button id="dark-btn" onClick={() => { changeColorMode("dark-app")} } className="btn btn-outline-secondary ml-2" >
        {t('dark-mode')}
      </button> : <button id="light-btn" onClick={() => { changeColorMode("light-app")} } className="btn btn-outline-primary ml-2">
        {t('light-mode')}
      </button>
    )
  }

  return (
    <nav>
      { languageButton() }

      { themeButton() }

      <button onClick={() => { firebase.auth().signOut() } } className="btn btn-outline-secondary ml-2" >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
