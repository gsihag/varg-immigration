
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About Us
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Our Services
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/services">All Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/family-visas">Family Visas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/work-visas">Work Visas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/study-visas">Study Visas</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Contact
            </Link>
            
            <Link to="/ritu">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4">
                Consult with Ritu
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Services
              </Link>
              
              <Link 
                to="/family-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 pl-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                - Family Visas
              </Link>
              
              <Link 
                to="/work-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 pl-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                - Work Visas
              </Link>
              
              <Link 
                to="/study-visas" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 pl-4 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                - Study Visas
              </Link>
              
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <Link 
                to="/ritu" 
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium mt-2 w-full">
                  Consult with Ritu
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
