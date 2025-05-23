
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';

const ForgotPasswordPage = () => {
  const handleForgotPassword = (data: any) => {
    alert(`Password reset link sent to ${data.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <AuthForm type="forgot-password" onSubmit={handleForgotPassword} />
        <div className="text-center mt-6">
          <Link to="/login" className="text-green-400 hover:text-green-300">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
