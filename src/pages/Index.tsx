
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';

const Index = () => {
  const services = [
    { 
      name: 'Skilled Migration', 
      description: 'Expert guidance on skilled visa pathways and points-based applications for professionals.',
      icon: '💼'
    },
    { 
      name: 'Family & Partner Visas', 
      description: 'Compassionate support for family reunification and partner visa applications.',
      icon: '👨‍👩‍👧‍👦'
    },
    { 
      name: 'Student Visas', 
      description: 'Complete assistance for studying in Australia - from application to arrival.',
      icon: '🎓'
    },
    { 
      name: 'Business & Investment', 
      description: 'Strategic pathways for entrepreneurs and investors seeking Australian opportunities.',
      icon: '🏢'
    },
    { 
      name: 'Permanent Residency', 
      description: 'End-to-end support for achieving your Australian permanent residency goals.',
      icon: '🏠'
    },
    { 
      name: 'Citizenship Applications', 
      description: 'Final step guidance to become an Australian citizen with confidence.',
      icon: '🇦🇺'
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-australia-blue/10 to-australia-blue/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="mb-4">
                  <span className="bg-australia-blue/10 text-australia-blue px-3 py-1 rounded-full text-sm font-medium">
                    Trusted by 5000+ Indian Families
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                  Your Gateway to <span className="text-australia-blue">Australia</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-600">
                  VARG Immigration specializes in helping Indian diaspora achieve their Australian migration dreams. 
                  Get instant guidance from our AI assistant <span className="font-semibold text-australia-blue">Ritu</span> 
                  and expert support from registered migration agents.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-australia-blue hover:bg-australia-darkBlue text-lg"
                    asChild
                  >
                    <Link to="/meeting">Talk to Ritu AI</Link>
                  </Button>
                  <Button
                    variant="outline" 
                    size="lg"
                    className="border-australia-blue text-australia-blue hover:bg-australia-blue/10 text-lg"
                    asChild
                  >
                    <Link to="/about">Meet Our Experts</Link>
                  </Button>
                </div>
                
                <Disclaimer className="mt-6" />
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-australia-blue/10 animate-pulse-slow"></div>
                  <div className="relative bg-australia-blue rounded-full w-48 h-48 md:w-64 md:h-64 flex items-center justify-center text-white text-6xl md:text-7xl font-bold">
                    R
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                    <div className="text-2xl">🇮🇳</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose VARG Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Why Choose VARG Immigration?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Combining cutting-edge AI technology with human expertise to serve the Indian community's migration needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <div className="text-3xl">🤖</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Guidance</h3>
                <p className="text-gray-600">
                  Get instant answers from Ritu, our AI assistant trained specifically on Australian immigration for Indians.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <div className="text-3xl">👥</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Human Support</h3>
                <p className="text-gray-600">
                  Registered migration agents and consultants who understand the unique needs of Indian applicants.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <div className="text-3xl">🎯</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Specialized for Indians</h3>
                <p className="text-gray-600">
                  Deep understanding of Indian qualifications, work experience, and cultural considerations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Our Immigration Services</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Comprehensive immigration solutions tailored for Indian professionals and families.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border hover:border-australia-blue/30 hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-australia-blue">{service.name}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                className="bg-australia-blue hover:bg-australia-darkBlue mr-4"
                asChild
              >
                <Link to="/meeting">Start with Ritu AI</Link>
              </Button>
              <Button 
                variant="outline"
                className="border-australia-blue text-australia-blue hover:bg-australia-blue/10"
                asChild
              >
                <Link to="/contact">Book Expert Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Success Stories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-australia-blue/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-australia-blue font-bold">RK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Raj Kumar</h4>
                    <p className="text-sm text-gray-600">Software Engineer from Bangalore</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "VARG Immigration made my skilled migration journey seamless. Ritu helped me understand the points system, and their experts guided me through every step."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-australia-blue/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-australia-blue font-bold">PS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-gray-600">Family Visa from Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "Reuniting with my husband in Australia was my dream. VARG's team understood our situation and made it happen in record time."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-australia-blue/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-australia-blue font-bold">AM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Arjun Mehta</h4>
                    <p className="text-sm text-gray-600">Business Investor from Delhi</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "As an entrepreneur, I needed specialized guidance for investor visa. VARG's expertise in business immigration was exactly what I needed."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
