import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  farmSize: string;
  experience: string;
  language: string;
  farmType: string;
  mainCrops: string[];
  address: string;
  notifications: boolean;
  weatherAlerts: boolean;
  marketUpdates: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Rajesh Kumar Gowda',
    email: 'rajesh.gowda@gmail.com',
    phone: '+91 98765 43210',
    district: 'Mandya',
    farmSize: '12 acres',
    experience: '15 years',
    language: 'Kannada',
    farmType: 'Mixed Farming',
    mainCrops: ['Sugarcane', 'Rice', 'Coconut'],
    address: 'Village: Srirangapatna, Taluk: Mandya',
    notifications: true,
    weatherAlerts: true,
    marketUpdates: true,
    password: 'password123'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43211',
    district: 'Mysore',
    farmSize: '8 acres',
    experience: '8 years',
    language: 'English',
    farmType: 'Organic Farming',
    mainCrops: ['Coffee', 'Cardamom', 'Pepper'],
    address: 'Village: Nanjangud, Taluk: Mysore',
    notifications: true,
    weatherAlerts: false,
    marketUpdates: true,
    password: 'password123'
  },
  {
    id: '3',
    name: 'Kumar Reddy',
    email: 'kumar.reddy@gmail.com',
    phone: '+91 98765 43212',
    district: 'Bangalore Rural',
    farmSize: '15 acres',
    experience: '20 years',
    language: 'Kannada',
    farmType: 'Commercial Farming',
    mainCrops: ['Rice', 'Ragi', 'Vegetables'],
    address: 'Village: Devanahalli, Taluk: Bangalore Rural',
    notifications: false,
    weatherAlerts: true,
    marketUpdates: false,
    password: 'password123'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('karnataka-krishi-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('karnataka-krishi-user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('karnataka-krishi-user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const signup = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      district: userData.district || '',
      farmSize: userData.farmSize || '',
      experience: userData.experience || '',
      language: userData.language || 'Kannada',
      farmType: userData.farmType || 'Mixed Farming',
      mainCrops: userData.mainCrops || [],
      address: userData.address || '',
      notifications: userData.notifications ?? true,
      weatherAlerts: userData.weatherAlerts ?? true,
      marketUpdates: userData.marketUpdates ?? true,
    };
    
    // Add to mock users
    mockUsers.push({ ...newUser, password: userData.password });
    
    setUser(newUser);
    localStorage.setItem('karnataka-krishi-user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('karnataka-krishi-user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('karnataka-krishi-user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
