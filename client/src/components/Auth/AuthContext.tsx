// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface User {
  _id: string;
  email: string;
  name: string;
  role : string;
  avatar : string
  // Add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  
 async function login (email: string, password: string) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      { email, password },
      { withCredentials: true }
    );
    
    if (response.data.success) {
      setUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    }
  };

  async function logout () {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    toast({
      title: "Success!",
      description: "You've been logged out successfully.",
    });
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};