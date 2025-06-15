
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, Users, ArrowRight, Clock, Shield, CheckCircle, Zap, Globe } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-trust-blue via-confidence-purple to-energy-pink text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-action-orange/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-energy-pink/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-action-warm/30 rounded-full blur-2xl float-animation" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        {/* Urgency Banner */}
        <div className="inline-flex items-center bg-gradient-to-r from-excitement-red/30 to-action-orange/30 backdrop-blur-lg rounded-full px-4 py-2 text-xs font-bold text-white border border-excitement-red/30 mb-5 urgency-element">
          <div className="w-2 h-2 bg-excitement-red rounded-full mr-2 animate-pulse"></div>
          <span className="text-excitement-red font-bold">Limited Time:</span>
          <span className="ml-2 text-white">Free personalized consultation for first 100 users today</span>
          <Clock className="w-3 h-3 ml-2 text-action-warm animate-pulse" />
        </div>
        
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">
          Ready to Start Your
          <span className="block gradient-text mt-1">Australian Journey?</span>
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-blue-100 font-medium">
          Join <span className="font-bold text-action-warm">5,000+ successful applicants</span> who chose VARG Immigration with Ritu for their migration journey
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white font-bold text-lg px-8 py-4 rounded-xl magnetic-hover attention-grab border-0" asChild>
            <Link to="/ritu">
              <Bot className="mr-2 w-5 h-5 group-hover:animate-bounce" />
              Chat with Ritu Now - FREE
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="group bg-white text-trust-blue border-3 border-white hover:bg-blue-50 hover:border-blue-100 hover:text-trust-deep hover:shadow-lg font-bold text-lg px-8 py-4 rounded-xl magnetic-hover transition-all duration-300" asChild>
            <Link to="/contact">
              <Users className="mr-2 w-5 h-5" />
              Book Expert Consultation
            </Link>
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-blue-200">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <Shield className="w-3 h-3 text-success-green" />
            <span className="font-medium text-sm">100% Secure & Private</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 text-success-green" />
            <span className="font-medium text-sm">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <Zap className="w-3 h-3 text-action-warm" />
            <span className="font-medium text-sm">Instant AI Response</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <Globe className="w-3 h-3 text-calm-teal" />
            <span className="font-medium text-sm">Global Success Stories</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
