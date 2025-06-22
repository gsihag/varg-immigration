
import { useState} from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [showCustomCode, setShowCustomCode] = useState(false);
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
                      <Input placeholder="First Name" type="text"/>
                      <Input placeholder="Last Name" type="text"/>
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <div className="flex">
                     <select 
                      className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-australia-blue bg-white"
                      onChange={(e) => setShowCustomCode(e.target.value === 'other')}
                     >
                     <option value="+91">🇮🇳 +91</option>
                     <option value="+61">🇦🇺 +61</option>
                     <option value="other">Other</option>
                     </select>
                     {showCustomCode ? (
                     <Input placeholder="Country" type="text" className="w-20 rounded-none border-l-0 border-r-0"/>
                      ) : null}
                     <Input placeholder="Phone Number" type="tel" className="rounded-l-none border-l-0 flex-1"/>
                    </div>
                    <Input placeholder="Subject" type="text"/>
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
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <svg className="w-6 h-6 text-australia-blue" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">WhatsApp</h3>
                        <p className="text-gray-600">+91 90504 16158</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <Phone className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-600">+61 420 575 011</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <Mail className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">info@vargimmigration.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <MapPin className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-gray-600">1 Renou Rd<br />Wantirna South VIC 3152 <br />Australia</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110">
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
                      <a href="/contact">
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
