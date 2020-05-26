import React from 'react';
import firebase from '../../services/firebase';

import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  };

  function changeColorMode(mode) {
    if (mode === "dark-app") {
      document.getElementById("light-btn").classList.remove("d-none")
      document.getElementById("dark-btn").classList.add("d-none")
    }
    else {
      document.getElementById("light-btn").classList.add("d-none")
      document.getElementById("dark-btn").classList.remove("d-none")
    }
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

  return (
    <nav>
      { languageButton() }

      <button id="light-btn" onClick={() => { changeColorMode("light-app")} } className="btn btn-outline-primary ml-2 d-none">
      {t('light-mode')}
      </button>

      <button id="dark-btn" onClick={() => { changeColorMode("dark-app")} } className="btn btn-outline-secondary ml-2" >
      {t('dark-mode')}
      </button>

      <button onClick={() => { firebase.auth().signOut() } } className="btn btn-outline-secondary ml-2" >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
