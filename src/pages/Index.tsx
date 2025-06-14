import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import { CheckCircle, Users, Clock, Shield, Star, ArrowRight, MessageCircle, Zap, Target, Trophy, Eye, TrendingUp, Sparkles, Heart, Lock, Globe } from 'lucide-react';

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  const services = [
    { 
      name: 'Skilled Migration Consulting', 
      description: 'Fast-track your career with AI-guided skilled visa consultation. Get personalized pathway recommendations instantly.',
      icon: '🎯',
      popular: true,
      successRate: '96%',
      avgTime: '6-8 months',
      gradient: 'from-trust-blue to-confidence-purple'
    },
    { 
      name: 'Family & Partner Visa Guidance', 
      description: 'Reunite with loved ones faster. Our personalized AI ensures your family visa consultation is perfect from day one.',
      icon: '❤️',
      popular: false,
      successRate: '94%',
      avgTime: '12-18 months',
      gradient: 'from-warmth-coral to-energy-pink'
    },
    { 
      name: 'Student Visa Support', 
      description: 'Start your Australian education journey with confidence. Personalized AI-powered consultation from start to finish.',
      icon: '🎓',
      popular: true,
      successRate: '99%',
      avgTime: '4-6 weeks',
      gradient: 'from-success-green to-calm-teal'
    },
    { 
      name: 'Work Visa Consulting', 
      description: 'Secure your Australian work opportunity with expert AI guidance and strategic consultation.',
      icon: '💼',
      popular: false,
      successRate: '91%',
      avgTime: '8-12 months',
      gradient: 'from-action-orange to-action-warm'
    },
  ];

  const stats = [
    { number: '5,000+', label: 'Success Stories', icon: <Trophy className="w-5 h-5" />, color: 'text-action-orange' },
    { number: '98%', label: 'Success Rate', icon: <Target className="w-5 h-5" />, color: 'text-success-green' },
    { number: '24/7', label: 'AI Support', icon: <Zap className="w-5 h-5" />, color: 'text-energy-pink' },
    { number: '15+', label: 'Years Experience', icon: <Star className="w-5 h-5" />, color: 'text-confidence-purple' }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      location: "Sydney, Australia",
      text: "Ritu AI made my PR consultation effortless! The personalized guidance was like having a migration expert in my pocket 24/7.",
      rating: 5,
      avatar: "👩‍💻",
      highlight: "Got PR in 8 months!"
    },
    {
      name: "Ahmed Hassan",
      role: "Business Analyst",
      location: "Melbourne, Australia", 
      text: "The personalized AI predicted every requirement before I even asked. Saved me months of research and thousands in consultant fees.",
      rating: 5,
      avatar: "👨‍💼",
      highlight: "Saved $5,000+"
    },
    {
      name: "Maria Rodriguez",
      role: "Nurse",
      location: "Perth, Australia",
      text: "VARG's human touch combined with personalized AI precision made my family reunion possible. Emotional and efficient support!",
      rating: 5,
      avatar: "👩‍⚕️",
      highlight: "Family reunited!"
    }
  ];

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Personalized AI Guidance',
      description: 'Get instant, tailored answers from Ritu - your personal AI consultant trained on 10,000+ successful applications and Australian immigration law',
      highlight: 'Personalized',
      color: 'text-trust-blue',
      bgGradient: 'from-trust-blue/10 to-confidence-purple/10',
      borderColor: 'border-trust-blue/20'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Human Consultants',
      description: 'Best-in-business migration consultants ready to handle complex cases with personal attention and years of expertise',
      highlight: 'Best in Business',
      color: 'text-action-orange',
      bgGradient: 'from-action-orange/10 to-action-warm/10',
      borderColor: 'border-action-orange/20'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Faster Processing',
      description: 'Personalized AI-assisted document preparation and error detection reduces consultation time significantly',
      highlight: '50% Faster',
      color: 'text-success-green',
      bgGradient: 'from-success-green/10 to-calm-teal/10',
      borderColor: 'border-success-green/20'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Guaranteed Accuracy',
      description: 'Our personalized AI ensures error-free consultation with human expert verification and guidance',
      highlight: '100% Accurate',
      color: 'text-energy-pink',
      bgGradient: 'from-energy-pink/10 to-confidence-purple/10',
      borderColor: 'border-energy-pink/20'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section - Optimized sizing */}
      <section className="relative bg-gradient-to-br from-trust-blue via-trust-deep to-confidence-purple text-white overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-action-orange/20 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-energy-pink/20 rounded-full blur-3xl float-animation" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-action-warm/30 rounded-full blur-2xl float-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {/* Live Activity Badge - Social Proof + Urgency */}
              <div className="inline-flex items-center bg-gradient-to-r from-success-green/20 to-calm-teal/20 backdrop-blur-lg rounded-full px-4 py-2 text-sm font-bold text-white border border-success-green/30 pulse-glow">
                <div className="w-2 h-2 bg-success-green rounded-full mr-2 animate-pulse"></div>
                <span className="text-success-green font-bold">{liveUsersCount}</span>
                <span className="ml-1 text-white">users chatting with Ritu AI right now</span>
                <Sparkles className="w-3 h-3 ml-2 text-action-warm animate-pulse" />
              </div>
              
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                Your Journey to
                <span className="block gradient-text mt-2">Australia Starts Here</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
                Experience the future of migration with <span className="font-bold text-action-warm gradient-text">Ritu AI</span> - 
                your personalized AI consultant combined with Australia's best immigration consultancy for <span className="font-bold text-success-green">guaranteed success.</span>
              </p>
              
              {/* Trust + Social Proof Bar */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 trust-badge">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-gradient-action rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">SC</div>
                      <div className="w-8 h-8 bg-gradient-success rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">AH</div>
                      <div className="w-8 h-8 bg-gradient-energy rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">MR</div>
                      <div className="w-8 h-8 bg-gradient-warm rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">+2K</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-action-warm text-action-warm" />
                      ))}
                    </div>
                    <div className="text-white font-bold text-base">{ritualInteractionCount.toLocaleString()}</div>
                    <div className="text-blue-200 text-xs">successful interactions this week</div>
                  </div>
                </div>
              </div>
              
              {/* Primary CTA Buttons - Optimized sizing */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white font-bold text-lg px-8 py-4 rounded-xl magnetic-hover attention-grab border-0" asChild>
                  <Link to="/meeting">
                    <MessageCircle className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                    <span>Chat with Ritu AI - FREE</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="group border-2 border-white text-white hover:bg-white hover:text-trust-blue font-bold text-lg px-8 py-4 rounded-xl magnetic-hover backdrop-blur-sm" asChild>
                  <Link to="/contact">
                    <Users className="mr-2 w-5 h-5" />
                    Book Expert Consultation
                  </Link>
                </Button>
              </div>
              
              {/* Stats with Psychological Impact - Reduced size */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer interactive-card">
                    <div className={`flex justify-center mb-2 ${stat.color} group-hover:animate-bounce`}>
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-action-warm mb-1">{stat.number}</div>
                    <div className="text-xs text-blue-100 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Ritu AI Preview - Reduced size */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-action-orange/30 to-energy-pink/30 blur-2xl group-hover:from-action-orange/40 group-hover:to-energy-pink/40 transition-all duration-500 animate-pulse"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm interactive-card border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-action rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold shadow-xl pulse-glow">
                      R
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 gradient-text-blue">Meet Ritu AI</h3>
                      <p className="text-slate-600 font-medium text-sm">Your Personal Migration Consultant</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                        <span className="text-xs text-success-green font-bold">Online & Ready to Help</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 text-slate-700 text-sm mb-4 border-l-4 border-trust-blue">
                    "Hi! I'm Ritu, your personalized AI migration consultant. I've helped 5,000+ people achieve their Australian dream with tailored guidance. Ready to make yours come true? What's your migration goal?"
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="typing-indicator flex space-x-1">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <Button className="bg-gradient-action hover:shadow-lg text-white rounded-full px-4 py-2 font-bold magnetic-hover text-sm" asChild>
                      <Link to="/meeting">
                        Start Chat
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rotating Testimonials - Reduced padding */}
      <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              <span className="gradient-text">Real Stories</span>, Real Success
            </h2>
            <div className="flex justify-center items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-action-orange text-action-orange" />
              ))}
              <span className="ml-3 text-slate-700 font-bold text-base">4.9/5 from 2,000+ happy clients</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden border border-slate-200">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-action"></div>
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === activeTestimonial ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8 absolute inset-0 p-6 lg:p-8'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4 float-animation">{testimonial.avatar}</div>
                    <div className="inline-block bg-gradient-success rounded-full px-4 py-1 text-white font-bold text-sm mb-4">
                      {testimonial.highlight}
                    </div>
                    <blockquote className="text-xl lg:text-2xl text-slate-700 mb-6 italic font-medium leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-action-orange text-action-orange" />
                      ))}
                    </div>
                    <div className="font-bold text-lg text-slate-800 gradient-text-blue">{testimonial.name}</div>
                    <div className="text-slate-600 font-medium">{testimonial.role}</div>
                    <div className="text-trust-blue font-bold">{testimonial.location}</div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-action-orange scale-125 shadow-lg' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Reduced padding */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Choose <span className="gradient-text">VARG Immigration</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
              We combine cutting-edge personalized AI technology with Australia's best migration consultancy to deliver <span className="font-bold text-trust-blue">unmatched migration success</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className={`group border-2 ${feature.borderColor} hover:border-opacity-60 interactive-card bg-gradient-to-br ${feature.bgGradient} hover:shadow-2xl`}>
                <CardContent className="p-6 text-center relative overflow-hidden">
                  <div className={`absolute top-0 right-0 bg-gradient-action text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg`}>
                    {feature.highlight}
                  </div>
                  <div className={`mb-4 flex justify-center ${feature.color} group-hover:scale-125 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-trust-blue transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium text-sm">{feature.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-gradient-action text-white hover:shadow-lg magnetic-hover text-xs">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Reduced sizing */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              <span className="gradient-text">Complete Migration</span> Consultancy
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
              Comprehensive immigration consultancy services tailored to your unique situation and goals with personalized AI support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className={`group cursor-pointer border-2 hover:border-opacity-60 interactive-card ${service.popular ? 'ring-4 ring-action-orange/20 shadow-xl border-action-orange/30' : 'border-slate-200'}`}>
                <CardContent className="p-6 relative bg-white">
                  {service.popular && (
                    <div className="absolute -top-3 left-4 bg-gradient-action text-white px-4 py-1 rounded-full text-xs font-bold shadow-xl attention-grab">
                      🔥 Most Popular
                    </div>
                  )}
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 float-animation">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-trust-blue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-4 font-medium text-sm">{service.description}</p>
                  
                  {/* Success Metrics */}
                  <div className={`flex justify-between items-center mb-4 p-3 bg-gradient-to-r ${service.gradient} bg-opacity-10 rounded-lg border border-opacity-20`}>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success-green">{service.successRate}</div>
                      <div className="text-xs text-slate-600 font-medium">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-trust-blue">{service.avgTime}</div>
                      <div className="text-xs text-slate-600 font-medium">Avg. Time</div>
                    </div>
                  </div>
                  
                  <div className="text-trust-blue font-bold group-hover:text-action-orange transition-colors flex items-center justify-between">
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white text-lg px-10 py-4 rounded-xl magnetic-hover attention-grab font-bold" asChild>
              <Link to="/meeting">
                <MessageCircle className="mr-3 w-5 h-5 group-hover:animate-pulse" />
                Start with Ritu AI - It's FREE!
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Reduced sizing */}
      <section className="py-16 bg-gradient-to-br from-trust-blue via-confidence-purple to-energy-pink text-white relative overflow-hidden">
        {/* ... keep existing code (background elements) */}
        
        <div className="relative container mx-auto px-4 text-center">
          {/* Urgency Banner */}
          <div className="inline-flex items-center bg-gradient-to-r from-excitement-red/30 to-action-orange/30 backdrop-blur-lg rounded-full px-6 py-3 text-sm font-bold text-white border border-excitement-red/30 mb-6 urgency-element">
            <div className="w-2 h-2 bg-excitement-red rounded-full mr-2 animate-pulse"></div>
            <span className="text-excitement-red font-bold">Limited Time:</span>
            <span className="ml-2 text-white">Free personalized AI consultation for first 100 users today</span>
            <Clock className="w-3 h-3 ml-2 text-action-warm animate-pulse" />
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Start Your
            <span className="block gradient-text mt-2">Australian Journey?</span>
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-blue-100 font-medium">
            Join <span className="font-bold text-action-warm">5,000+ successful applicants</span> who chose VARG Immigration for their migration consultancy needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white font-bold text-xl px-10 py-6 rounded-xl magnetic-hover attention-grab border-0" asChild>
              <Link to="/meeting">
                <MessageCircle className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                Chat with Ritu AI Now - FREE
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group border-2 border-white text-white hover:bg-white hover:text-trust-blue font-bold text-xl px-10 py-6 rounded-xl magnetic-hover backdrop-blur-sm" asChild>
              <Link to="/contact">
                <Users className="mr-3 w-6 h-6" />
                Book Expert Consultation
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-success-green" />
              <span className="font-medium text-sm">100% Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <CheckCircle className="w-4 h-4 text-success-green" />
              <span className="font-medium text-sm">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-action-warm" />
              <span className="font-medium text-sm">Personalized AI Response</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-calm-teal" />
              <span className="font-medium text-sm">Global Success Stories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-6 bg-slate-100">
        <div className="container mx-auto px-4">
          <Disclaimer />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
