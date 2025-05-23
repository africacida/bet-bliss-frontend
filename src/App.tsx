
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { GameProvider } from "@/contexts/GameContext";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Dashboard from "@/pages/Dashboard";
import JackpotPage from "@/pages/JackpotPage";
import LuckyDrawPage from "@/pages/LuckyDrawPage";
import WalletPage from "@/pages/WalletPage";
import MyTicketsPage from "@/pages/MyTicketsPage";
import LuckyHistoryPage from "@/pages/LuckyHistoryPage";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboardMain from "@/pages/admin/AdminDashboardMain";
import JackpotManager from "@/pages/admin/JackpotManager";
import LuckyDrawManager from "@/pages/admin/LuckyDrawManager";
import UsersManager from "@/pages/admin/UsersManager";
import TransactionsManager from "@/pages/admin/TransactionsManager";
import ReportsManager from "@/pages/admin/ReportsManager";
import SettingsManager from "@/pages/admin/SettingsManager";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="jackpot" element={<ProtectedRoute><JackpotPage /></ProtectedRoute>} />
      <Route path="lucky-draw" element={<ProtectedRoute><LuckyDrawPage /></ProtectedRoute>} />
      <Route path="wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
      <Route path="my-tickets" element={<ProtectedRoute><MyTicketsPage /></ProtectedRoute>} />
      <Route path="lucky-history" element={<ProtectedRoute><LuckyHistoryPage /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
    
    {/* Admin Routes */}
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboardMain />} />
      <Route path="jackpot" element={<JackpotManager />} />
      <Route path="lucky-draw" element={<LuckyDrawManager />} />
      <Route path="users" element={<UsersManager />} />
      <Route path="transactions" element={<TransactionsManager />} />
      <Route path="reports" element={<ReportsManager />} />
      <Route path="settings" element={<SettingsManager />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <GameProvider>
            <AppRoutes />
          </GameProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
