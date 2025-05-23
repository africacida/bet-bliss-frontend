
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  if (!user?.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Navigate to="/admin" replace />;
};

export default AdminDashboard;
