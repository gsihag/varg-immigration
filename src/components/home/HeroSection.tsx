
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, ArrowRight, Star, Sparkles, Bot } from 'lucide-react';

const HeroSection = () => {
  const [ritualInteractionCount, setRitualInteractionCount] = useState(2847);
  const [liveUsersCount, setLiveUsersCount] = useState(127);

  // Simulate live interaction counter for urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setRitualInteractionCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      setLiveUsersCount(prev => 120 + Math.floor(Math.random() * 15));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-trust-blue via-trust-deep to-confidence-purple text-white overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-action-orange/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-energy-pink/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-action-warm/30 rounded-full blur-2xl float-animation" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {/* Live Activity Badge - Social Proof + Urgency */}
            <div className="inline-flex items-center bg-gradient-to-r from-success-green/20 to-calm-teal/20 backdrop-blur-lg rounded-full px-3 py-2 text-xs font-bold text-white border border-success-green/30 pulse-glow">
              <div className="w-2 h-2 bg-success-green rounded-full mr-2 animate-pulse"></div>
              <span className="text-success-green font-bold">{liveUsersCount}</span>
              <span className="ml-1 text-white">users chatting with Ritu right now</span>
              <Sparkles className="w-3 h-3 ml-2 text-action-warm animate-pulse" />
            </div>
            
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight">
              Your Journey to
              <span className="block gradient-text mt-1">Australia Starts Here</span>
            </h1>
            
            <p className="text-base lg:text-lg text-blue-100 leading-relaxed">
              Experience the future of migration with <span className="font-bold text-action-warm gradient-text">Ritu</span> - 
              your personalized AI consultant combined with Australia's best immigration consultancy for <span className="font-bold text-success-green">guaranteed success.</span>
            </p>
            
            {/* Trust + Social Proof Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 border border-white/20 trust-badge">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-gradient-action rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">SC</div>
                    <div className="w-6 h-6 bg-gradient-success rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">AH</div>
                    <div className="w-6 h-6 bg-gradient-energy rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs">MR</div>
                    <div className="w-6 h-6 bg-gradient-warm rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">+2K</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-action-warm text-action-warm" />
                    ))}
                  </div>
                  <div className="text-white font-bold text-sm">{ritualInteractionCount.toLocaleString()}</div>
                  <div className="text-blue-200 text-xs">successful interactions this week</div>
                </div>
              </div>
            </div>
            
            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white font-bold text-base px-6 py-3 rounded-xl magnetic-hover attention-grab border-0" asChild>
                <Link to="/">
                  <Bot className="mr-2 w-4 h-4 group-hover:animate-bounce" />
                  <span>Chat with Ritu - FREE</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="group border-2 border-white text-trust-blue hover:bg-white hover:text-trust-blue font-bold text-base px-6 py-3 rounded-xl magnetic-hover backdrop-blur-sm" asChild>
                <Link to="/contact">
                  <span>Book Expert Consultation</span>
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Interactive Ritu Preview */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-action-orange/30 to-energy-pink/30 blur-2xl group-hover:from-action-orange/40 group-hover:to-energy-pink/40 transition-all duration-500 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl max-w-xs interactive-card border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-action rounded-full w-12 h-12 flex items-center justify-center text-white text-lg font-bold shadow-xl pulse-glow">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 gradient-text-blue">Meet Ritu</h3>
                    <p className="text-slate-600 font-medium text-xs">Your Personal Migration Assistant</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-success-green rounded-full animate-pulse"></div>
                      <span className="text-xs text-success-green font-bold">Online & Ready to Help</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-3 text-slate-700 text-xs mb-3 border-l-4 border-trust-blue">
                  "Hi! I'm Ritu, your AI immigration assistant. I've helped 5,000+ people achieve their Australian dream with personalized guidance. Ready to start your journey? What's your migration goal?"
                </div>
                <div className="flex justify-between items-center">
                  <div className="typing-indicator flex space-x-1">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Button className="bg-gradient-action hover:shadow-lg text-white rounded-full px-3 py-2 font-bold magnetic-hover text-xs" asChild>
                    <Link to="/ritu">
                      Start Chat
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
