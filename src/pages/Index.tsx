
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import { CheckCircle, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react';

const Index = () => {
  const services = [
    { 
      name: 'Skilled Migration', 
      description: 'Expert guidance on skilled visa pathways and points-based applications for professionals.',
      icon: '🎯',
      popular: true
    },
    { 
      name: 'Family & Partner Visas', 
      description: 'Compassionate support for family reunification and partner visa applications.',
      icon: '❤️',
      popular: false
    },
    { 
      name: 'Student Visas', 
      description: 'Complete assistance for studying in Australia - from application to arrival.',
      icon: '🎓',
      popular: true
    },
    { 
      name: 'Business & Investment', 
      description: 'Strategic pathways for entrepreneurs and investors seeking Australian opportunities.',
      icon: '💼',
      popular: false
    },
    { 
      name: 'Permanent Residency', 
      description: 'End-to-end support for achieving your Australian permanent residency goals.',
      icon: '🏠',
      popular: true
    },
    { 
      name: 'Citizenship Applications', 
      description: 'Final step guidance to become an Australian citizen with confidence.',
      icon: '🇦🇺',
      popular: false
    },
  ];

  const stats = [
    { number: '5000+', label: 'Successful Applications' },
    { number: '98%', label: 'Success Rate' },
    { number: '24/7', label: 'AI Support' },
    { number: '15+', label: 'Years Experience' }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-australia-blue" />,
      title: 'AI-Powered Guidance',
      description: 'Get instant, accurate answers from Ritu - our advanced AI assistant trained on Australian immigration law'
    },
    {
      icon: <Users className="w-8 h-8 text-australia-blue" />,
      title: 'Expert Human Support',
      description: 'Registered migration agents and consultants ready to handle complex cases'
    },
    {
      icon: <Clock className="w-8 h-8 text-australia-blue" />,
      title: 'Faster Processing',
      description: 'Streamlined processes and AI-assisted document preparation reduce processing times'
    },
    {
      icon: <Shield className="w-8 h-8 text-australia-blue" />,
      title: 'Guaranteed Accuracy',
      description: 'Our AI ensures error-free applications with human expert verification'
    }
  ];
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-australia-blue via-australia-blue/90 to-australia-darkBlue text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Australia's Most Trusted Migration Experts
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
                Your Journey to
                <span className="block text-yellow-400">Australia Starts Here</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Experience the future of migration services with <span className="font-semibold text-yellow-400">Ritu AI</span> - 
                get instant expert guidance combined with human expertise for guaranteed success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-full" asChild>
                  <Link to="/meeting">
                    <span>Talk to Ritu AI</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-australia-blue font-semibold text-lg px-8 py-4 rounded-full" asChild>
                  <Link to="/contact">Book Free Consultation</Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-sm text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-blue-300/20 animate-pulse-slow"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-australia-blue rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold">
                      R
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Meet Ritu AI</h3>
                      <p className="text-gray-600">Your Personal Migration Assistant</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 text-gray-700 text-sm">
                    "Hi! I'm Ritu, your AI migration assistant. I can help you understand visa requirements, calculate points, and guide you through the entire process. What would you like to know about migrating to Australia?"
                  </div>
                  <div className="flex justify-end mt-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
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
              <Card key={index} className={`group cursor-pointer border-2 hover:border-australia-blue/50 transition-all duration-300 hover:shadow-xl ${service.popular ? 'ring-2 ring-australia-blue/20' : ''}`}>
                <CardContent className="p-8 relative">
                  {service.popular && (
                    <div className="absolute -top-3 left-6 bg-australia-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-australia-blue mb-3 group-hover:text-australia-darkBlue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                  <div className="mt-6 text-australia-blue font-semibold group-hover:text-australia-darkBlue transition-colors">
                    Learn More →
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-australia-blue hover:bg-australia-darkBlue text-white text-lg px-8 py-4 rounded-full" asChild>
              <Link to="/meeting">Get Started with Ritu AI</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Ready to Start Your Australian Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of successful applicants who chose VARG Immigration for their migration needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-4 rounded-full" asChild>
              <Link to="/meeting">Chat with Ritu AI Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-australia-blue font-semibold text-lg px-8 py-4 rounded-full" asChild>
              <Link to="/contact">Book Expert Consultation</Link>
            </Button>
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
