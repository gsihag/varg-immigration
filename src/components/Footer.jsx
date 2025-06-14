
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Heart, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 text-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-action-orange to-action-warm rounded-2xl w-14 h-14 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                V
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">VARG</div>
                <div className="text-sm text-action-orange font-semibold">Immigration</div>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">
              Australia's most trusted immigration specialists, combining <span className="text-action-orange font-bold">AI-powered assistance</span> with expert human guidance for your migration success.
            </p>
            <div className="flex items-center gap-3 bg-gradient-to-r from-action-orange/20 to-energy-pink/20 rounded-xl p-3 backdrop-blur-sm border border-action-orange/30">
              <div className="bg-gradient-to-r from-action-orange to-action-warm rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">R</div>
              <span className="text-slate-900 font-semibold">Powered by Ritu AI</span>
              <Sparkles className="w-4 h-4 text-action-orange animate-pulse" />
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-slate-900">Our Services</h3>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Skilled Migration
              </Link></li>
              <li><Link to="/services" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Family Visas
              </Link></li>
              <li><Link to="/services" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Business & Investment
              </Link></li>
              <li><Link to="/services" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Student Visas
              </Link></li>
              <li><Link to="/services" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Citizenship
              </Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-slate-900">Get Support</h3>
            <ul className="space-y-4">
              <li><Link to="/meeting" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <Sparkles className="w-4 h-4 mr-3 text-action-orange group-hover:animate-pulse" />
                Chat with Ritu AI
              </Link></li>
              <li><Link to="/contact" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <Heart className="w-4 h-4 mr-3 text-energy-pink group-hover:animate-pulse" />
                Book Consultation
              </Link></li>
              <li><Link to="/about" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                About Us
              </Link></li>
              <li><a href="#" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                FAQ
              </a></li>
              <li><a href="#" className="text-slate-700 hover:text-action-orange transition-colors font-medium flex items-center group">
                <span className="w-2 h-2 bg-action-orange rounded-full mr-3 group-hover:bg-slate-900 transition-colors"></span>
                Resources
              </a></li>
            </ul>
          </div>
          
          {/* Contact Info - Enhanced */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-slate-900">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="bg-trust-blue/20 rounded-lg p-2">
                  <Phone className="w-5 h-5 text-trust-blue" />
                </div>
                <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">+61 2 1234 5678</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-success-green/20 rounded-lg p-2">
                  <Mail className="w-5 h-5 text-success-green" />
                </div>
                <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">info@vargimmigration.com</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="bg-energy-pink/20 rounded-lg p-2">
                  <MapPin className="w-5 h-5 text-energy-pink" />
                </div>
                <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">Level 10, 123 Collins Street<br />Melbourne VIC 3000</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-action-orange/20 rounded-lg p-2">
                  <Clock className="w-5 h-5 text-action-orange" />
                </div>
                <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">Mon-Fri: 9AM-6PM AEST</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section - Enhanced */}
        <div className="border-t border-slate-300 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-sm font-medium">
              &copy; {new Date().getFullYear()} VARG Immigration. All rights reserved. | Registered Migration Agency
            </p>
            <p className="text-slate-600 text-sm font-medium">
              For official information, visit 
              <a 
                href="https://immi.homeaffairs.gov.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-action-orange hover:text-slate-900 transition-colors font-bold ml-1"
              >
                Department of Home Affairs
              </a>
            </p>
          </div>
          
          {/* Additional Trust Elements */}
          <div className="flex justify-center items-center gap-8 mt-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
              <span className="text-slate-700">Secure & Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-trust-blue rounded-full animate-pulse"></div>
              <span className="text-slate-700">Licensed Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-action-orange rounded-full animate-pulse"></div>
              <span className="text-slate-700">AI-Powered Excellence</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
