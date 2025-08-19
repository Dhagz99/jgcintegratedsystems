"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api"; // axios instance with withCredentials:true

type User = { id: number; email: string; name: string } | null;

const AuthContext = createContext<{
  user: User;
  setUser: (u: User) => void;
  loading: boolean;
}>({ user: null, setUser: () => {}, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
