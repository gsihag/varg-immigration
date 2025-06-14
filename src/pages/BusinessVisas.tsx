
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, TrendingUp, Users, Lightbulb } from 'lucide-react';

const BusinessVisas = () => {
  const businessVisaTypes = [
    {
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
      title: "Business Innovation (188A)",
      description: "For business owners who want to establish or develop a business in Australia",
      features: ["Business ownership experience", "$800,000 net business assets", "Provisional visa pathway"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Investor Stream (188B)",
      description: "For investors with a successful track record of investment activities",
      features: ["$2.5 million investment", "Investment experience required", "State nomination needed"]
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: "Significant Investor (188C)",
      description: "For high net worth individuals willing to invest $5 million in Australia",
      features: ["$5 million complying investment", "Fast processing", "Minimal residence requirements"]
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-purple-600" />,
      title: "Entrepreneur (188E)",
      description: "For entrepreneurs with innovative business ideas and funding agreements",
      features: ["$200,000 funding agreement", "Innovative business idea", "Third party funding"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business & Investment Visas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expand your business horizons in Australia. Whether you're an entrepreneur, investor, 
            or business owner, we'll help you find the right visa pathway for your goals.
          </p>
        </div>

        {/* Visa Types Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {businessVisaTypes.map((visa, index) => (
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
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Requirements */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Investment Thresholds</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-2xl text-emerald-700 mb-2">$200K</h3>
              <p className="text-sm text-gray-600">Entrepreneur Stream minimum funding</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="font-bold text-2xl text-blue-700 mb-2">$800K</h3>
              <p className="text-sm text-gray-600">Business Innovation net assets</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
              <h3 className="font-bold text-2xl text-orange-700 mb-2">$2.5M</h3>
              <p className="text-sm text-gray-600">Investor Stream requirement</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <h3 className="font-bold text-2xl text-purple-700 mb-2">$5M</h3>
              <p className="text-sm text-gray-600">Significant Investor threshold</p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-lg p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Business Visa Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold mb-2">Assessment</h3>
              <p className="text-sm opacity-90">Evaluate eligibility and business plan</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold mb-2">State Nomination</h3>
              <p className="text-sm opacity-90">Apply for state or territory nomination</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold mb-2">Visa Application</h3>
              <p className="text-sm opacity-90">Submit provisional visa application</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-emerald-600 font-bold text-lg">4</span>
              </div>
              <h3 className="font-semibold mb-2">Permanent Residency</h3>
              <p className="text-sm opacity-90">Apply for permanent visa after requirements met</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Invest in Your Australian Future?
          </h2>
          <p className="text-gray-600 mb-6">
            Our business migration specialists will help you navigate the complex requirements and maximize your chances of success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Business Assessment
            </Button>
            <Button size="lg" variant="outline">
              Download Guide
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BusinessVisas;
