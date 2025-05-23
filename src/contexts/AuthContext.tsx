import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  error: null,
});

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: 'user1',
    email: 'student@university.edu',
    password: 'password123',
    name: 'Alex Johnson',
    role: 'student' as const,
  },
  {
    id: 'user2',
    email: 'teacher@university.edu',
    password: 'teacher123',
    name: 'Dr. Sarah Chen',
    role: 'teacher' as const,
  },
];

// Local storage key for saving user data
const AUTH_STORAGE_KEY = 'attendance_tracker_auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedAuth) {
          const userData = JSON.parse(savedAuth);
          setUser(userData);
        }
      } catch (err) {
        // If there's an error parsing the saved auth, clear it
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function - in a real app, this would make an API call
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!foundUser) {
        setError('Invalid email or password');
        return false;
      }

      // Create a user object without the password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Save to localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  // Register function - in a real app, this would make an API call
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check if email is already taken
      const existingUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      );

      if (existingUser) {
        setError('Email is already registered');
        return false;
      }

      // Create new user (in a real app, this would be saved to a database)
      const newUser = {
        id: `user${MOCK_USERS.length + 1}`,
        email,
        name,
        role: 'student' as const,
      };

      // Add to mock users (this would be temporary in this example)
      MOCK_USERS.push({ ...newUser, password });

      // Set as current user
      setUser(newUser);

      // Save to localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return true;
    } catch (err) {
      setError('Registration failed. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
