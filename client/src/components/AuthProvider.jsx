import axios from "axios";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const login = useCallback(async (email, password, redirectUrl = "/") => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email,
        password,
      });

      setUser(response.data);
      setAuthenticated(true);
      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err);
      setAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
