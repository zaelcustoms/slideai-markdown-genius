
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { StrictMode } from "react";

// Create a client
const queryClient = new QueryClient();

// Layout components
const LandingPageLayout = () => (
  <>
    <Header />
    <LandingPage />
    <Footer />
  </>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex-1">{children}</div>
  </>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <div className="flex-1">{children}</div>
    <Footer />
  </>
);

const EditorLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex-1">{children}</div>
  </>
);

// Main App component
function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Routes>
                  <Route path="/" element={<LandingPageLayout />} />
                  <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
                  <Route path="/signup" element={<AuthLayout><Signup /></AuthLayout>} />
                  <Route path="/forgot-password" element={<AuthLayout><ForgotPassword /></AuthLayout>} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardLayout><Dashboard /></DashboardLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/editor/:id" element={
                    <ProtectedRoute>
                      <EditorLayout><Editor /></EditorLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
