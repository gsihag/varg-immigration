
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Globe, Trophy, Zap } from 'lucide-react';

const WorkVisas = () => {
  const workVisaTypes = [
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Skilled Independent (189)",
      description: "For skilled workers who want to live and work permanently in Australia",
      features: ["Points-based system", "No sponsor required", "Permanent residence"]
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Skilled Nominated (190)",
      description: "For skilled workers nominated by a state or territory government",
      features: ["State nomination required", "Extra points for nomination", "Permanent residence"]
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-600" />,
      title: "Employer Sponsored (482/186)",
      description: "For skilled workers sponsored by an Australian employer",
      features: ["Job offer required", "Temporary to permanent pathway", "Family included"]
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Global Talent (858)",
      description: "For highly skilled professionals in target sectors",
      features: ["Fast-track processing", "No age limit", "Exceptional talent pathway"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Work Visas for Australia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your career in Australia with our comprehensive work visa solutions. 
            From skilled migration to employer sponsorship, we'll help you find the right pathway.
          </p>
        </div>

        {/* Visa Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {workVisaTypes.map((visa, index) => (
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Assessment Section */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills Assessment Required</h2>
          <p className="text-gray-600 mb-6">
            Most work visas require a positive skills assessment from the relevant assessing authority for your occupation.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">STEP 1</h3>
              <p className="text-sm text-gray-600">Check occupation lists</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">STEP 2</h3>
              <p className="text-sm text-gray-600">Submit skills assessment</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">STEP 3</h3>
              <p className="text-sm text-gray-600">Lodge visa application</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Start Your Australian Work Visa Journey
          </h2>
          <p className="mb-6 opacity-90">
            Get personalized advice on the best work visa option for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Free Skills Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Book Consultation
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WorkVisas;
