
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';

const Index = () => {
  const visaTypes = [
    { name: 'Skilled Migration', description: 'Information on skilled visas and points-based applications.' },
    { name: 'Family & Partner Visas', description: 'Guidance for family reunification and partner visa applications.' },
    { name: 'Student Visas', description: 'Requirements and processes for studying in Australia.' },
    { name: 'Work Visas', description: 'Temporary and permanent work visa options and requirements.' },
    { name: 'Business & Investment', description: 'Pathways for business owners and investors.' },
    { name: 'Visitor Visas', description: 'Tourist and short-term visit visa information.' },
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
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                  Meet <span className="text-australia-blue">Gulshan</span>, Your AI Australian Migration Assistant
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-600">
                  Get instant, personalized guidance on Australian visa options, requirements, and migration processes. Ask any questions in real-time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-australia-blue hover:bg-australia-darkBlue text-lg"
                  >
                    <Link to="/meeting">Start Video Meeting</Link>
                  </Button>
                  <Button
                    variant="outline" 
                    size="lg"
                    className="border-australia-blue text-australia-blue hover:bg-australia-blue/10 text-lg"
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
                
                <Disclaimer className="mt-6" />
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-australia-blue/10 animate-pulse-slow"></div>
                  <div className="relative bg-australia-blue rounded-full w-48 h-48 md:w-64 md:h-64 flex items-center justify-center text-white text-6xl md:text-7xl font-bold">
                    G
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">How Gulshan Can Help You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-australia-blue">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Instant Information</h3>
                <p className="text-gray-600">
                  Ask questions about visa types, requirements, and processes. Get immediate, accurate responses.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-australia-blue">
                    <path d="M20 16.7a7 7 0 0 0-14 0"></path>
                    <path d="M12 15V3"></path>
                    <path d="M8 7l4-4 4 4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore Your Options</h3>
                <p className="text-gray-600">
                  Understand which visa pathways are suitable for your specific situation and goals.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-australia-blue/10 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-australia-blue">
                    <path d="M7 10h10"></path>
                    <path d="M7 14h10"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Navigate Requirements</h3>
                <p className="text-gray-600">
                  Learn about documentation, fees, processing times, and next steps in your migration journey.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Visa Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Visa Categories Covered</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Gulshan can answer questions about all Australian visa types and immigration pathways.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaTypes.map((visa, index) => (
                <Card key={index} className="border hover:border-australia-blue/30 hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-australia-blue">{visa.name}</h3>
                    <p className="text-gray-600 text-sm">{visa.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button 
                className="bg-australia-blue hover:bg-australia-darkBlue"
                asChild
              >
                <Link to="/meeting">Ask Questions Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
