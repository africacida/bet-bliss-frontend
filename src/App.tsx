
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/AdminLayout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import WalletPage from '@/pages/WalletPage';
import MyTicketsPage from '@/pages/MyTicketsPage';
import LuckyHistoryPage from '@/pages/LuckyHistoryPage';
import JackpotPage from '@/pages/JackpotPage';
import LuckyDrawPage from '@/pages/LuckyDrawPage';
import JackpotGame from '@/pages/JackpotGame';
import LuckyDraw from '@/pages/LuckyDraw';
import SettingsPage from '@/pages/SettingsPage';
import ProfilePage from '@/pages/ProfilePage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboardMain from '@/pages/admin/AdminDashboardMain';
import JackpotManager from '@/pages/admin/JackpotManager';
import LuckyDrawManager from '@/pages/admin/LuckyDrawManager';
import { AuthProvider } from '@/contexts/AuthContext';
import { GameProvider } from '@/contexts/GameContext';
import { Toaster } from "@/components/ui/toaster"
import { DemoGameProvider } from '@/contexts/DemoGameContext';

function App() {
  return (
    <AuthProvider>
      <DemoGameProvider>
        <GameProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <Routes>
                {/* Main App Routes */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="wallet" element={<WalletPage />} />
                  <Route path="my-tickets" element={<MyTicketsPage />} />
                  <Route path="lucky-history" element={<LuckyHistoryPage />} />
                  <Route path="jackpot" element={<JackpotGame />} />
                  <Route path="lucky-draw" element={<LuckyDraw />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="jackpot-old" element={<JackpotPage />} />
                  <Route path="lucky-draw-old" element={<LuckyDrawPage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardMain />} />
                  <Route path="jackpot" element={<JackpotManager />} />
                  <Route path="lucky-draw" element={<LuckyDrawManager />} />
                </Route>
              </Routes>
              <Toaster />
            </div>
          </BrowserRouter>
        </GameProvider>
      </DemoGameProvider>
    </AuthProvider>
  );
}

export default App;
