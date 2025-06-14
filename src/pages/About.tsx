
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Clock, Shield, Brain, CheckCircle } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "5000+", label: "Successful Applications" },
    { number: "98%", label: "Success Rate" },
    { number: "10+", label: "Years Experience" },
    { number: "24/7", label: "AI Support" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Assistance",
      description: "Ritu AI provides instant, accurate guidance based on the latest immigration laws and regulations."
    },
    {
      icon: Users,
      title: "Expert Human Support",
      description: "Registered Migration Agents with decades of combined experience in Australian immigration."
    },
    {
      icon: Shield,
      title: "Compliance & Security", 
      description: "Fully compliant with MARA regulations and committed to protecting your personal information."
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Streamlined processes and AI assistance help reduce application preparation time significantly."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-australia-blue to-australia-darkBlue text-white py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                  About VARG Immigration
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  We're Australia's most innovative immigration consultancy, combining cutting-edge AI technology with expert human guidance to make your migration journey seamless and successful.
                </p>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-australia-blue" asChild>
                  <a href="/contact">Get Started Today</a>
                </Button>
              </div>
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-blue-100 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Story</h2>
              <p className="text-lg text-gray-600 mb-8">
                Founded with a vision to revolutionize immigration services, VARG Immigration combines traditional expertise with innovative AI technology. Our team of registered migration agents has helped thousands of individuals and families achieve their Australian dreams.
              </p>
              <p className="text-lg text-gray-600">
                With Ritu AI, we've created the first 24/7 AI immigration assistant that provides instant, accurate guidance while our human experts handle complex cases and provide personalized support when needed.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose VARG Immigration?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-australia-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h2>
                <div className="space-y-4">
                  {[
                    "Transparency in all our processes and pricing",
                    "Innovation through AI-powered assistance",
                    "Personalized service for every client",
                    "Commitment to successful outcomes",
                    "Compliance with all regulations",
                    "Continuous support throughout your journey"
                  ].map((value, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-australia-blue" />
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="shadow-lg bg-gradient-to-br from-australia-blue/5 to-australia-blue/10 border-australia-blue/20">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="bg-australia-blue rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      R
                    </div>
                    <h3 className="text-xl font-semibold text-australia-blue mb-4">Meet Ritu AI</h3>
                    <p className="text-gray-700 mb-6">
                      Our AI assistant is trained on thousands of successful cases and the latest immigration laws to provide you with accurate, instant guidance 24/7.
                    </p>
                    <Button className="w-full bg-australia-blue hover:bg-australia-darkBlue" asChild>
                      <a href="/meeting">Chat with Ritu Now</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
