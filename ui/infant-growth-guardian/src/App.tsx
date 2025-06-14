
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiClient } from '@/lib/api';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

type AppPage = 'home' | 'login' | 'register' | 'dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app start
  useEffect(() => {
    const checkAuthState = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set token in API client
          apiClient.setToken(token);
          setIsAuthenticated(true);
          setCurrentPage('dashboard');
          console.log('User authenticated from stored token');
        } catch (error) {
          console.error('Invalid stored token:', error);
          localStorage.removeItem('token');
          apiClient.removeToken();
        }
      }
      setIsLoading(false);
    };

    checkAuthState();
  }, []);

  const handleLogin = (token: string, role: string) => {
    apiClient.setToken(token);
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentPage('dashboard');
    console.log('User logged in successfully:', { role });
  };

  const handleLogout = () => {
    apiClient.removeToken();
    setIsAuthenticated(false);
    setUserRole('');
    setCurrentPage('home');
    console.log('User logged out successfully');
  };

  const renderCurrentPage = () => {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'register':
        return <Register onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {renderCurrentPage()}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
