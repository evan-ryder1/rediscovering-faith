"use client";

import {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const storageKey = "rediscovering-faith-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      try {
        const storedUser = window.localStorage.getItem(storageKey);
        setUser(storedUser ? (JSON.parse(storedUser) as AuthUser) : null);
      } catch {
        setUser(null);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      signIn(nextUser) {
        window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
        setUser(nextUser);
      },
      signOut() {
        window.localStorage.removeItem(storageKey);
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
