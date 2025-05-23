
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';

const RegisterPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (data: any) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signup(data.email, data.password, data.name);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthForm type="register" onSubmit={handleRegister} />
        <div className="text-center mt-6">
          <p className="text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-green-400 hover:text-green-300">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
