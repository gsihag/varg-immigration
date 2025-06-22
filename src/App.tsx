
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/utils/ScrollToTop";
import { LanguageProvider } from "@/components/LanguageSelector";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import AuthProvider from "@/components/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import Meeting from "./pages/Meeting";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FamilyVisas from "./pages/FamilyVisas";
import WorkVisas from "./pages/WorkVisas";
import StudyVisas from "./pages/StudyVisas";
import Auth from "./pages/Auth";

// Protected pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Documents from "./pages/Documents";
import Cases from "./pages/Cases";
import Consultations from "./pages/Consultations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/family-visas" element={<FamilyVisas />} />
              <Route path="/work-visas" element={<WorkVisas />} />
              <Route path="/study-visas" element={<StudyVisas />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/documents" element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/cases" element={
                <ProtectedRoute>
                  <Cases />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/consultations" element={
                <ProtectedRoute>
                  <Consultations />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Floating Chat Widget - appears on public pages only */}
            <FloatingChatWidget />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
