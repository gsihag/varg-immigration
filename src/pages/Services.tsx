
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Heart, Briefcase, Users, Home, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Skilled Migration",
      description: "Subclass 189, 190, 491 - Independent and nominated skilled visas for qualified professionals.",
      features: ["Skills Assessment", "Points Calculation", "EOI Submission", "Visa Application"]
    },
    {
      icon: Heart,
      title: "Family & Partner Visas",
      description: "Reunite with your loved ones through partner, parent, and child visas.",
      features: ["Partner Visas", "Parent Visas", "Child Visas", "Relationship Documentation"]
    },
    {
      icon: GraduationCap,
      title: "Student Visas",
      description: "Study in Australia with comprehensive student visa support and pathway planning.",
      features: ["Course Selection", "Visa Application", "GTE Preparation", "Post-Study Options"]
    },
    {
      icon: Users,
      title: "Business & Investment",
      description: "Business innovation, investor, and entrepreneur visa pathways.",
      features: ["Business Plans", "Investment Requirements", "Nomination Process", "Compliance"]
    },
    {
      icon: Home,
      title: "Employer Sponsorship",
      description: "Temporary and permanent employer-sponsored work visas.",
      features: ["TSS Visa (482)", "ENS Visa (186)", "RSMS Visa (187)", "Labour Agreements"]
    },
    {
      icon: Shield,
      title: "Citizenship & Appeals",
      description: "Australian citizenship applications and visa refusal appeals.",
      features: ["Citizenship Test Prep", "Application Lodgement", "Appeal Assistance", "AAT Representation"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-australia-blue to-australia-darkBlue text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Immigration Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive Australian immigration services powered by expert knowledge and Ritu AI technology
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <service.icon className="w-8 h-8 text-australia-blue" />
                    </div>
                    <CardTitle className="text-xl text-australia-blue">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-australia-blue rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Australian Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get personalized guidance from our experts or chat with Ritu AI for instant assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-australia-blue hover:bg-australia-darkBlue" asChild>
                <a href="/contact">Book Consultation</a>
              </Button>
              <Button size="lg" variant="outline" className="border-australia-blue text-australia-blue hover:bg-australia-blue hover:text-white" asChild>
                <a href="/meeting">Chat with Ritu AI</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
