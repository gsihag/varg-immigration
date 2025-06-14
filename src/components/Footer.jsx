
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-auto py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl font-bold text-australia-blue">VARG</div>
              <div className="text-sm text-gray-600">Immigration</div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Trusted Australian immigration specialists serving the Indian diaspora with AI-powered assistance and expert guidance.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-australia-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xs">R</div>
              <span className="text-xs text-gray-600">Powered by Ritu AI</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-australia-blue">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/skilled" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Skilled Migration</Link></li>
              <li><Link to="/services/family" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Family Visas</Link></li>
              <li><Link to="/services/business" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Business & Investment</Link></li>
              <li><Link to="/services/student" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Student Visas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-australia-blue">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/meeting" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Chat with Ritu AI</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Book Consultation</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">FAQ</Link></li>
              <li><Link to="/resources" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-australia-blue">Legal Information</h3>
            <p className="text-xs text-gray-600 mb-4">
              VARG Immigration is a registered migration agency. All AI-powered information is supplemented by expert human guidance.
            </p>
            <p className="text-xs text-gray-600 mb-4">
              For official information, visit the 
              <a 
                href="https://immi.homeaffairs.gov.au/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-australia-blue hover:underline ml-1"
              >
                Department of Home Affairs
              </a>
              .
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} VARG Immigration. All rights reserved. | Serving Indian diaspora since 2018</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
