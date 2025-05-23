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
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import JackpotGame from "@/pages/JackpotGame";
import LuckyDraw from "@/pages/LuckyDraw";
import Wallet from "@/pages/Wallet";
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
      <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="jackpot" element={<ProtectedRoute><JackpotGame /></ProtectedRoute>} />
      <Route path="lucky-draw" element={<ProtectedRoute><LuckyDraw /></ProtectedRoute>} />
      <Route path="wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
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
