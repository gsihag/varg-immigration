
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          
          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search visas, services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800 font-medium">
              Login
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-800 font-medium">
              Sign up
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
              Select visas
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6">
              Book a consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Main Navigation - Desktop (Always Visible) */}
        <nav className="hidden lg:block pb-4 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-center space-x-12">
            <Link 
              to="/family-visas" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
            >
              Family Visas
            </Link>
            <Link 
              to="/work-visas" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
            >
              Work Visas
            </Link>
            <Link 
              to="/study-visas" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
            >
              Study Visas
            </Link>
            <Link 
              to="/business-visas" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-green-50"
            >
              Business Visas
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search visas, services..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-gray-200">
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800 font-medium">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button variant="ghost" className="justify-start text-gray-600 hover:text-gray-800 font-medium">
                <User className="w-4 h-4 mr-2" />
                Sign up
              </Button>
              <Button variant="outline" className="justify-start border-gray-300 text-gray-700 hover:bg-gray-50 font-medium">
                Select visas
              </Button>
              <Button className="justify-start bg-green-600 hover:bg-green-700 text-white font-medium">
                Book a consultation
              </Button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/family-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Family Visas
              </Link>
              <Link 
                to="/work-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Work Visas
              </Link>
              <Link 
                to="/study-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Study Visas
              </Link>
              <Link 
                to="/business-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Business Visas
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
