import React, { createContext, useState, useEffect } from "react";
import firebase from '../firebase';

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(firebase.auth() || null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, [] );

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
