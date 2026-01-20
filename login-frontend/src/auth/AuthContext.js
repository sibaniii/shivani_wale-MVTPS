import { createContext, useContext, useState, useEffect } from "react";
import { login, refreshToken } from "../api/endpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("role");
    if (token && savedUser && savedRole) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({ ...parsedUser, role: savedRole });
      } catch {
        localStorage.clear();
      }
    }
  }, []);

  const signIn = async ({ username, password }) => {
    setLoading(true);
    try {
      const { data } = await login({ username, password });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.role);
      setUser({ ...data.user, role: data.role });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.response?.data?.detail || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return false;
    try {
      const { data } = await refreshToken({ refresh });
      localStorage.setItem("accessToken", data.access);
      return true;
    } catch {
      signOut();
      return false;
    }
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role, loading, signIn, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);