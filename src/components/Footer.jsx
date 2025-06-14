
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-australia-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <div>
                <div className="text-2xl font-bold">VARG</div>
                <div className="text-sm text-gray-400">Immigration</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Australia's most trusted immigration specialists, combining AI-powered assistance with expert human guidance for your migration success.
            </p>
            <div className="flex items-center gap-2 text-australia-blue">
              <div className="bg-australia-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xs">R</div>
              <span className="text-sm font-semibold">Powered by Ritu AI</span>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-australia-blue">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services/skilled" className="text-gray-300 hover:text-white transition-colors">Skilled Migration</Link></li>
              <li><Link to="/services/family" className="text-gray-300 hover:text-white transition-colors">Family Visas</Link></li>
              <li><Link to="/services/business" className="text-gray-300 hover:text-white transition-colors">Business & Investment</Link></li>
              <li><Link to="/services/student" className="text-gray-300 hover:text-white transition-colors">Student Visas</Link></li>
              <li><Link to="/services/citizenship" className="text-gray-300 hover:text-white transition-colors">Citizenship</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-australia-blue">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/meeting" className="text-gray-300 hover:text-white transition-colors">Chat with Ritu AI</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Book Consultation</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-australia-blue">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-australia-blue" />
                <span className="text-gray-300">+61 2 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-australia-blue" />
                <span className="text-gray-300">info@vargimmigration.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-australia-blue mt-1" />
                <span className="text-gray-300">Level 10, 123 Collins Street<br />Melbourne VIC 3000</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-australia-blue" />
                <span className="text-gray-300">Mon-Fri: 9AM-6PM AEST</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} VARG Immigration. All rights reserved. | Registered Migration Agency
            </p>
            <p className="text-gray-400 text-sm">
              For official information, visit 
              <a 
                href="https://immi.homeaffairs.gov.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-australia-blue hover:underline ml-1"
              >
                Department of Home Affairs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
