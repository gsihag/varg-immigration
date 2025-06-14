
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, Bot, Users } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-slate-50 via-white to-green-50 shadow-2xl sticky top-0 z-50 border-b-2 border-green-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          {/* Logo - Redesigned for Consultancy */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl w-16 h-16 flex items-center justify-center text-white font-black text-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                V
              </div>
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full w-6 h-6 flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                VARG
              </div>
              <div className="text-sm font-bold text-slate-600 -mt-1 tracking-wide">
                Immigration Consultancy
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-orange-600">
                <Sparkles className="w-3 h-3" />
                <span>Powered by Ritu AI</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation - Redesigned */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-2xl px-2 py-2 shadow-lg border border-green-100">
              <Link to="/" className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 rounded-full transition-all duration-300 group-hover:w-8"></span>
              </Link>
              <Link to="/services" className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 relative group">
                Services
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 rounded-full transition-all duration-300 group-hover:w-8"></span>
              </Link>
              <Link to="/about" className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 relative group">
                About Us
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 rounded-full transition-all duration-300 group-hover:w-8"></span>
              </Link>
              <Link to="/contact" className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-base px-6 py-3 rounded-xl transition-all duration-300 relative group">
                Contact
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-green-600 rounded-full transition-all duration-300 group-hover:w-8"></span>
              </Link>
            </div>
          </nav>
          
          {/* CTA Buttons - Redesigned */}
          <div className="hidden lg:flex items-center gap-3">
            <Button className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/30" asChild>
              <Link to="/meeting">
                <Bot className="mr-3 w-5 h-5 group-hover:animate-bounce" />
                Chat with Ritu AI
                <Sparkles className="ml-2 w-4 h-4 group-hover:animate-spin" />
              </Link>
            </Button>
            <Button className="group bg-white hover:bg-green-50 border-3 border-green-600 text-green-700 hover:text-green-800 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" asChild>
              <Link to="/contact">
                <Users className="mr-2 w-5 h-5" />
                Book Consultation
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Redesigned */}
          <button
            className="lg:hidden bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Redesigned */}
        {isMenuOpen && (
          <div className="lg:hidden py-8 bg-white/95 backdrop-blur-sm rounded-2xl mx-4 mb-4 shadow-2xl border border-green-100">
            <nav className="flex flex-col space-y-2 px-6">
              <Link 
                to="/" 
                className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-lg py-4 px-4 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-lg py-4 px-4 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/about" 
                className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-lg py-4 px-4 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-700 hover:text-green-700 hover:bg-green-50 font-bold text-lg py-4 px-4 rounded-xl transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="flex flex-col gap-4 pt-6 border-t border-green-100 mt-4">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-black text-lg py-4 rounded-2xl shadow-xl" asChild>
                  <Link to="/meeting" onClick={() => setIsMenuOpen(false)}>
                    <Bot className="mr-3 w-5 h-5" />
                    Chat with Ritu AI
                    <Sparkles className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button className="w-full bg-white border-3 border-green-600 text-green-700 hover:bg-green-50 font-black text-lg py-4 rounded-2xl shadow-xl" asChild>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Users className="mr-2 w-5 h-5" />
                    Book Consultation
                  </Link>
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
