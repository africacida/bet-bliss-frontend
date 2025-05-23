import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Settings, Zap, TrendingUp, FileText, CalendarDays } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Jackpot Manager', href: '/admin/jackpot', icon: Zap },
    { name: 'Lucky Draw Manager', href: '/admin/lucky-draw', icon: TrendingUp },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Transactions', href: '/admin/transactions', icon: FileText },
    { name: 'Reports', href: '/admin/reports', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-4">You don't have permission to access the admin panel.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <span className="text-white text-xl font-bold">🛡️ Admin Panel</span>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
                  isActive(item.href) ? 'bg-gray-700 text-white border-r-4 border-blue-500' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
              >
                ☰
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
