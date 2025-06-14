
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import { CheckCircle, Users, Clock, Shield, Star, ArrowRight, MessageCircle, Zap, Target, Trophy, Eye, TrendingUp } from 'lucide-react';

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [ritualInteractionCount, setRitualInteractionCount] = useState(2847);

  // Simulate live interaction counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRitualInteractionCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { 
      name: 'Skilled Migration', 
      description: 'Expert guidance on skilled visa pathways and points-based applications for professionals.',
      icon: '🎯',
      popular: true,
      successRate: '96%',
      avgTime: '6-8 months'
    },
    { 
      name: 'Family & Partner Visas', 
      description: 'Compassionate support for family reunification and partner visa applications.',
      icon: '❤️',
      popular: false,
      successRate: '94%',
      avgTime: '12-18 months'
    },
    { 
      name: 'Student Visas', 
      description: 'Complete assistance for studying in Australia - from application to arrival.',
      icon: '🎓',
      popular: true,
      successRate: '99%',
      avgTime: '4-6 weeks'
    },
    { 
      name: 'Business & Investment', 
      description: 'Strategic pathways for entrepreneurs and investors seeking Australian opportunities.',
      icon: '💼',
      popular: false,
      successRate: '91%',
      avgTime: '8-12 months'
    },
    { 
      name: 'Permanent Residency', 
      description: 'End-to-end support for achieving your Australian permanent residency goals.',
      icon: '🏠',
      popular: true,
      successRate: '97%',
      avgTime: '10-14 months'
    },
    { 
      name: 'Citizenship Applications', 
      description: 'Final step guidance to become an Australian citizen with confidence.',
      icon: '🇦🇺',
      popular: false,
      successRate: '100%',
      avgTime: '6-8 months'
    },
  ];

  const stats = [
    { number: '5000+', label: 'Successful Applications', icon: <Trophy className="w-6 h-6" /> },
    { number: '98%', label: 'Success Rate', icon: <Target className="w-6 h-6" /> },
    { number: '24/7', label: 'AI Support', icon: <Zap className="w-6 h-6" /> },
    { number: '15+', label: 'Years Experience', icon: <Star className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      location: "Sydney, Australia",
      text: "Ritu AI helped me understand the points system in minutes! Got my PR in 8 months.",
      rating: 5,
      avatar: "👩‍💻"
    },
    {
      name: "Ahmed Hassan",
      role: "Business Analyst",
      location: "Melbourne, Australia", 
      text: "The AI guidance was incredible - felt like having a migration expert available 24/7.",
      rating: 5,
      avatar: "👨‍💼"
    },
    {
      name: "Maria Rodriguez",
      role: "Nurse",
      location: "Perth, Australia",
      text: "VARG made my family visa process so smooth. Ritu answered every question instantly!",
      rating: 5,
      avatar: "👩‍⚕️"
    }
  ];

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-australia-blue" />,
      title: 'AI-Powered Guidance',
      description: 'Get instant, accurate answers from Ritu - our advanced AI assistant trained on Australian immigration law',
      highlight: 'Instant Answers'
    },
    {
      icon: <Users className="w-8 h-8 text-australia-blue" />,
      title: 'Expert Human Support',
      description: 'Registered migration agents and consultants ready to handle complex cases',
      highlight: 'Licensed Experts'
    },
    {
      icon: <Clock className="w-8 h-8 text-australia-blue" />,
      title: 'Faster Processing',
      description: 'Streamlined processes and AI-assisted document preparation reduce processing times',
      highlight: '50% Faster'
    },
    {
      icon: <Shield className="w-8 h-8 text-australia-blue" />,
      title: 'Guaranteed Accuracy',
      description: 'Our AI ensures error-free applications with human expert verification',
      highlight: '100% Accurate'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section with Psychological Triggers */}
      <section className="relative bg-gradient-to-br from-australia-blue via-australia-blue/90 to-australia-darkBlue text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating Elements for Visual Interest */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Social Proof Badge */}
              <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white border border-green-400/30">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-300">{ritualInteractionCount.toLocaleString()}</span>
                <span className="ml-1">people used Ritu AI today</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                Your Journey to
                <span className="block text-yellow-400 animate-fade-in">Australia Starts Here</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Experience the future of migration services with <span className="font-semibold text-yellow-400 underline decoration-yellow-400/50">Ritu AI</span> - 
                get instant expert guidance combined with human expertise for guaranteed success.
              </p>
              
              {/* Urgency + Social Proof */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">+2K</div>
                  </div>
                  <span className="text-blue-100">
                    <span className="font-semibold text-yellow-400">2,847 people</span> got visa guidance this week
                  </span>
                </div>
              </div>
              
              {/* CTA Buttons with Psychological Triggers */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105" asChild>
                  <Link to="/meeting">
                    <MessageCircle className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                    <span>Talk to Ritu AI - FREE</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="group border-2 border-white text-white hover:bg-white hover:text-australia-blue font-semibold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300" asChild>
                  <Link to="/contact">
                    <Users className="mr-2 w-5 h-5" />
                    Book Expert Consultation
                  </Link>
                </Button>
              </div>
              
              {/* Stats with Icons */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <div className="flex justify-center mb-2 text-yellow-400 group-hover:animate-bounce">
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Interactive Ritu AI Preview */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-300/20 animate-pulse group-hover:from-yellow-400/30 group-hover:to-blue-300/30 transition-all duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-md hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-pulse">
                      R
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Meet Ritu AI</h3>
                      <p className="text-gray-600">Your Personal Migration Assistant</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-600 font-medium">Online Now</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 text-sm mb-4">
                    "Hi! I'm Ritu, your AI migration assistant. I can help you understand visa requirements, calculate points, and guide you through the entire process. What would you like to know about migrating to Australia?"
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <Button size="sm" className="bg-australia-blue hover:bg-australia-darkBlue text-white rounded-full px-4 py-2 text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                      <Link to="/meeting">
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

      {/* Rotating Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <div className="flex justify-center items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600 font-semibold">4.9/5 from 2,000+ reviews</span>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-australia-blue to-australia-gold"></div>
              
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeTestimonial ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8 absolute inset-0 p-8 lg:p-12'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{testimonial.avatar}</div>
                    <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6 italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="font-bold text-lg text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-australia-blue font-semibold">{testimonial.location}</div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-australia-blue scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Hover Effects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-australia-blue">VARG Immigration</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with human expertise to deliver unmatched migration services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 cursor-pointer bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-australia-blue text-white text-xs font-bold px-3 py-1 rounded-bl-2xl">
                    {feature.highlight}
                  </div>
                  <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-australia-blue transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="outline" className="border-australia-blue text-australia-blue hover:bg-australia-blue hover:text-white">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Success Metrics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Migration Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive immigration solutions tailored to your unique situation and goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group cursor-pointer border-2 hover:border-australia-blue/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${service.popular ? 'ring-2 ring-australia-blue/20 shadow-lg' : ''}`}>
                <CardContent className="p-8 relative">
                  {service.popular && (
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      🔥 Most Popular
                    </div>
                  )}
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{service.icon}</div>
                  <h3 className="text-xl font-bold text-australia-blue mb-3 group-hover:text-australia-darkBlue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
                  
                  {/* Success Metrics */}
                  <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{service.successRate}</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-australia-blue">{service.avgTime}</div>
                      <div className="text-xs text-gray-600">Avg. Time</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-australia-blue font-semibold group-hover:text-australia-darkBlue transition-colors flex items-center justify-between">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="group bg-australia-blue hover:bg-australia-darkBlue text-white text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-australia-blue/25 transition-all duration-300 hover:scale-105" asChild>
              <Link to="/meeting">
                <MessageCircle className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                Get Started with Ritu AI
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency CTA Section */}
      <section className="py-20 bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-australia-gold/20 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium text-white border border-red-400/30 mb-6">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-red-300">Limited Time:</span>
            <span className="ml-1">Free AI consultation for first 100 users today</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Ready to Start Your Australian Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of successful applicants who chose VARG Immigration for their migration needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="group bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105" asChild>
              <Link to="/meeting">
                <MessageCircle className="mr-2 w-5 h-5 group-hover:animate-bounce" />
                Chat with Ritu AI Now - FREE
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group border-2 border-white text-white hover:bg-white hover:text-australia-blue font-semibold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300" asChild>
              <Link to="/contact">
                <Users className="mr-2 w-5 h-5" />
                Book Expert Consultation
              </Link>
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex justify-center items-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Instant Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Disclaimer />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
