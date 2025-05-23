
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  updateBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  balance: 250.75,
  isAdmin: false
};

const mockAdmin: User = {
  id: 'admin',
  name: 'Admin User',
  email: 'admin@betbliss.com',
  balance: 0,
  isAdmin: true
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (email === 'admin@betbliss.com') {
      setUser(mockAdmin);
    } else {
      setUser(mockUser);
    }
  };

  const signup = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      balance: 100, // Welcome bonus
      isAdmin: false
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      setUser({ ...user, balance: user.balance + amount });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        updateBalance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
