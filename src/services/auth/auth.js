import React, { createContext, useState, useEffect } from "react";
import firebase from '../firebase';

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        if (!localStorage.getItem('user')) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        setUser(user);
      }
      else {
        console.log("teste");
        localStorage.removeItem('user');
        localStorage.removeItem('current_state');
        localStorage.removeItem('old_state');
        setUser(null);
      }
    });
  }, [] );

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
