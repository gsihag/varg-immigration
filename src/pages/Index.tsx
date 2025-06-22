import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTASection from '@/components/home/FinalCTASection';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Auth Banner for logged in users */}
      {user && (
        <div className="bg-australia-blue text-white py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm">Welcome back! Access your immigration dashboard.</span>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="bg-white text-australia-blue hover:bg-gray-100"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      )}

      {/* Auth Banner for non-logged in users */}
      {!user && (
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LogIn className="h-4 w-4" />
              <span className="text-sm">Start your Australian immigration journey today!</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="bg-white text-green-700 hover:bg-gray-100"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/auth')}
                className="border-white text-white hover:bg-white hover:text-green-700"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content remains the same */}
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
