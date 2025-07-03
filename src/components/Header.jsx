import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleServicesClick = () => {
    navigate('/services');
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-green-600 rounded-lg w-10 h-10 flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-gray-800 tracking-tight">
                VARG
              </div>
              <div className="text-xs text-gray-600 -mt-1">
                Immigration Consultancy
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4"
            >
              About Us
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                onClick={handleServicesClick}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4 flex items-center"
              >
                Our Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[160px] z-50">
                  <Link
                    to="/family-visas" 
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                  >
                    Family Visas
                  </Link>
                  <Link 
                    to="/work-visas" 
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                  >
                    Work Visas
                  </Link>
                  <Link 
                    to="/study-visas" 
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                  >
                    Study Visas
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4"
            >
              Contact
            </Link>
          </nav>

          {/* Dashboard Button */}
          <div className="flex items-center">
            <Button
              onClick={handleDashboardClick}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {user ? 'Your Dashboard' : 'Login / Register'}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Simplified */}
        <div className="md:hidden pb-4">
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
            >
              About Us
            </Link>
            
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
            >
              Our Services
            </Link>
            
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;