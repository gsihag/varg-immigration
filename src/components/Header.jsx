
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-australia-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl">G</div>
          <span className="font-semibold text-xl">Gulshan</span>
          <span className="bg-australia-blue text-white text-xs px-2 py-1 rounded-full">AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Home</Link>
          <Link to="/about" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">About</Link>
          <Link to="/faq" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">FAQ</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <Link to="/meeting" className="hidden sm:block">
            <Button variant="outline" className="border-australia-blue text-australia-blue hover:text-white hover:bg-australia-blue">
              Start Meeting
            </Button>
          </Link>
          <Button className="bg-australia-blue hover:bg-australia-darkBlue transition-colors">
            <Link to="/meeting">Talk to Gulshan</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
