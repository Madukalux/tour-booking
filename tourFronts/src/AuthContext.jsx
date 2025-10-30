import { createContext, useContext, useEffect, useState } from "react";
import api from "./api";  // <— use your axios instance

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // persist token
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // hydrate user when we already have a token (e.g. page reload)
  useEffect(() => {
    if (!token || user) return;
    (async () => {
      try {
        const { data } = await api.get("/api/users/me");
        const { id, name, email, role } = data || {};
        setUser({ id, name, email, role });
      } catch {
        // invalid token -> clear
        setToken(null);
        setUser(null);
      }
    })();
  }, [token, user]);

  const login = ({ token, userId, name, email, role }) => {
    setToken(token);
    setUser({ id: userId, name, email, role });
  };

  const logout = () => { setToken(null); setUser(null); };

  return (
    <AuthCtx.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
