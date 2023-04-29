import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);

  function login() {
    setAuthenticated(true);
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
