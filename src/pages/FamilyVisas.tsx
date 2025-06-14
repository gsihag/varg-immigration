
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, Baby, Home } from 'lucide-react';

const FamilyVisas = () => {
  const familyVisaTypes = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Partner Visa (820/801)",
      description: "For married couples or de facto partners of Australian citizens or permanent residents",
      features: ["Temporary to Permanent pathway", "Work rights included", "Medicare access"]
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Parent Visa (103/143)",
      description: "For parents of Australian citizens, permanent residents or eligible New Zealand citizens",
      features: ["Contributory and non-contributory options", "Permanent residence", "Family reunion"]
    },
    {
      icon: <Baby className="w-8 h-8 text-green-500" />,
      title: "Child Visa (101/102)",
      description: "For dependent children of Australian citizens or permanent residents",
      features: ["For children under 18", "Step-children eligible", "Adopted children included"]
    },
    {
      icon: <Home className="w-8 h-8 text-purple-500" />,
      title: "Other Family Visas",
      description: "Various other family reunion options including aged dependent relatives",
      features: ["Carer Visa (116)", "Aged Dependent Relative", "Last remaining relative"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Family Visas for Australia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reunite with your loved ones in Australia. We help families navigate the complex visa process 
            to bring partners, children, parents, and other family members to Australia.
          </p>
        </div>

        {/* Visa Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {familyVisaTypes.map((visa, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  {visa.icon}
                  <CardTitle className="text-xl">{visa.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {visa.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {visa.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Family Visa Application?
          </h2>
          <p className="text-gray-600 mb-6">
            Our experienced migration agents will guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline">
              Download Checklist
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyVisas;
