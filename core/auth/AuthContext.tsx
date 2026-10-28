import React, { createContext, useCallback, useContext, useState } from "react";

export interface UserSession {
  accessToken: string;
  user: {
    id: string;
    name: string;
  };
}

interface AuthContextValue {
  session: UserSession | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading] = useState(false);

  const signIn = useCallback(async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      throw new Error("Ingresa tu usuario y contraseña.");
    }

    // Solo permite acceso simulado durante el desarrollo.
    if (process.env.EXPO_PUBLIC_MOCK_AUTH !== "true") {
      throw new Error(
        "El servicio de autenticación todavía no está conectado.",
      );
    }

    setSession({
      accessToken: "demo-only",
      user: {
        id: "demo-user",
        name: username.trim(),
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider.");
  }

  return context;
}
