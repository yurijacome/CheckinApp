"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  nome: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: (redirect?: boolean) => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    // Ensure we're on the client side before accessing localStorage
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // In a real app, you'd validate the token with the backend
        // For now, we'll decode the JWT to get user info
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          setUser({
            id: payload.id,
            email: payload.email,
            nome: payload.nome,
            isAdmin: payload.isAdmin
          });
          setToken(storedToken);
        } catch (error) {
          console.error('Invalid token:', error);
          logout();
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    setLoading(false);
  };

  const login = (token: string, user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    setToken(token);
    setUser(user);
  };

  const logout = (redirect: boolean = true) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userActiveComponent'); // Limpa componente salvo
    }
    setToken(null);
    setUser(null);
    if (redirect && typeof window !== 'undefined') {
      router.push('/pageLogin');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
