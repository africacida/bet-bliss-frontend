
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Layout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-white text-xl font-bold">BetBliss</span>
            </Link>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-white hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
                <Link to="/jackpot" className="text-white hover:text-green-400 transition-colors">
                  Jackpot
                </Link>
                <Link to="/lucky-draw" className="text-white hover:text-green-400 transition-colors">
                  Lucky Draw
                </Link>
                <Link to="/wallet" className="text-white hover:text-green-400 transition-colors">
                  Wallet
                </Link>
                {user?.isAdmin && (
                  <Link to="/admin" className="text-orange-400 hover:text-orange-300 transition-colors">
                    Admin
                  </Link>
                )}
                <div className="text-green-400 font-semibold">
                  ₵{user?.balance.toFixed(2)}
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
