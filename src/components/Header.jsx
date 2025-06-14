
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Enhanced with Psychology */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-trust rounded-2xl w-14 h-14 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              V
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-trust-blue to-confidence-purple bg-clip-text text-transparent">VARG</div>
              <div className="text-sm text-slate-600 font-semibold -mt-1">Immigration</div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-trust-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/services" className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-trust-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors relative group">
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-trust-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-trust-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* CTA Buttons - Psychology-Optimized */}
          <div className="hidden lg:flex items-center gap-4">
            <Button className="group bg-gradient-action hover:shadow-xl text-white font-bold text-lg px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 magnetic-hover" asChild>
              <Link to="/meeting">
                <Sparkles className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                Ask Ritu AI
              </Link>
            </Button>
            <Button variant="outline" className="border-2 border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white font-bold text-lg px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105" asChild>
              <Link to="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700 hover:text-trust-blue p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200 bg-white">
            <nav className="flex flex-col space-y-6">
              <Link 
                to="/" 
                className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-700 hover:text-trust-blue font-semibold text-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-4 pt-4">
                <Button className="w-full bg-gradient-action hover:shadow-lg text-white font-bold text-lg py-3 rounded-xl" asChild>
                  <Link to="/meeting" onClick={() => setIsMenuOpen(false)}>
                    <Sparkles className="mr-2 w-5 h-5" />
                    Ask Ritu AI
                  </Link>
                </Button>
                <Button variant="outline" className="w-full border-2 border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white font-bold text-lg py-3 rounded-xl" asChild>
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
