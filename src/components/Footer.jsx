
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-australia-blue rounded-full w-10 h-10 flex items-center justify-center text-white font-bold text-xl">G</div>
              <span className="font-semibold text-xl">Gulshan</span>
              <span className="bg-australia-blue text-white text-xs px-2 py-1 rounded-full">AI</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your AI migration assistant for Australian visa information and guidance.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-australia-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Home</Link></li>
              <li><Link to="/meeting" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">Start Meeting</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">About Gulshan</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-australia-blue transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-australia-blue">Important Information</h3>
            <p className="text-xs text-gray-600 mb-4">
              Gulshan is an AI assistant and provides information based on publicly available resources. 
              All information provided should not be considered as legal advice.
            </p>
            <p className="text-xs text-gray-600">
              For official information, please visit the 
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
          <p>&copy; {new Date().getFullYear()} Gulshan AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
