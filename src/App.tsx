
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import Index from "./pages/Index";
import Meeting from "./pages/Meeting";
import RituMeeting from "./pages/RituMeeting";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FamilyVisas from "./pages/FamilyVisas";
import WorkVisas from "./pages/WorkVisas";
import StudyVisas from "./pages/StudyVisas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/ritu" element={<RituMeeting />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/family-visas" element={<FamilyVisas />} />
          <Route path="/work-visas" element={<WorkVisas />} />
          <Route path="/study-visas" element={<StudyVisas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Floating Chat Widget - appears on all pages */}
        <FloatingChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
