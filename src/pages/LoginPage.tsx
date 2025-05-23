
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    login(data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthForm type="login" onSubmit={handleLogin} />
        <div className="text-center mt-6">
          <p className="text-white/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-400 hover:text-green-300">
              Sign up here
            </Link>
          </p>
          <Link to="/forgot-password" className="text-white/70 hover:text-white block mt-2">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
