
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-australia-blue">VARG</div>
            <div className="text-sm text-gray-600">Immigration</div>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Home</Link>
          <Link to="/services" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Services</Link>
          <Link to="/about" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">About</Link>
          <Link to="/contact" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Contact</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/meeting" className="hidden sm:block">
            <Button variant="outline" className="border-australia-blue text-australia-blue hover:text-white hover:bg-australia-blue">
              Ask Ritu AI
            </Button>
          </Link>
          <Button className="bg-australia-blue hover:bg-australia-darkBlue transition-colors" asChild>
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
