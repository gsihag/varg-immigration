
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-australia-blue to-australia-darkBlue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Contact VARG Immigration
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Ready to start your Australian migration journey? Get in touch with our expert team or chat with Ritu AI for instant guidance.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-australia-blue">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Phone Number" />
                    <Input placeholder="Subject" />
                    <textarea 
                      className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-australia-blue" 
                      placeholder="Your Message"
                    />
                    <Button className="w-full bg-australia-blue hover:bg-australia-darkBlue">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl text-australia-blue">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-600">+61 2 1234 5678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">info@vargimmigration.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-gray-600">Level 10, 123 Collins Street<br />Melbourne VIC 3000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p className="text-gray-600">Mon-Fri: 9AM-6PM AEST</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ritu AI Card */}
                <Card className="shadow-lg bg-gradient-to-br from-australia-blue/5 to-australia-blue/10 border-australia-blue/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-australia-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                        R
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-australia-blue">Chat with Ritu AI</h3>
                        <p className="text-gray-600">Get instant answers 24/7</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">
                      Need immediate assistance? Chat with our AI-powered assistant for instant guidance on visa requirements, eligibility, and processes.
                    </p>
                    <Button className="w-full bg-australia-blue hover:bg-australia-darkBlue" asChild>
                      <a href="/meeting">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Chat with Ritu
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
