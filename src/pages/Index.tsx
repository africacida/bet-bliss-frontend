
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if authenticated, otherwise to home
  return <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />;
};

export default Index;
