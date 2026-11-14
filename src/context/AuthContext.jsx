import { createContext, useContext, useState } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() =>
    sessionStorage.getItem("auth_token")
  );

  const login = async (credentials) => {
    const response = await api.post("/login", credentials);

    const { user: loggedInUser, token: accessToken } = response.data;

    sessionStorage.setItem("auth_token", accessToken);
    sessionStorage.setItem("auth_user", JSON.stringify(loggedInUser));

    setToken(accessToken);
    setUser(loggedInUser);

    return loggedInUser;
  };

  const register = async (registrationData) => {
    const response = await api.post("/register", registrationData);

    return response.data;
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post("/logout");
      }
    } finally {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_user");

      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isAdmin: user?.role === "admin",
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
