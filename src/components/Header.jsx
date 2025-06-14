
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-australia-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <div>
              <div className="text-2xl font-bold text-australia-blue">VARG</div>
              <div className="text-sm text-gray-600 -mt-1">Immigration</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-australia-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-australia-blue font-medium transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-australia-blue font-medium transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-australia-blue font-medium transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/meeting">
              <Button variant="outline" className="border-australia-blue text-australia-blue hover:bg-australia-blue hover:text-white font-semibold">
                Ask Ritu AI
              </Button>
            </Link>
            <Button className="bg-australia-blue hover:bg-australia-darkBlue font-semibold" asChild>
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-australia-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-australia-blue font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-australia-blue font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-australia-blue font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-australia-blue font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4">
                <Link to="/meeting" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-australia-blue text-australia-blue hover:bg-australia-blue hover:text-white font-semibold">
                    Ask Ritu AI
                  </Button>
                </Link>
                <Button className="w-full bg-australia-blue hover:bg-australia-darkBlue font-semibold" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Book Consultation</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
