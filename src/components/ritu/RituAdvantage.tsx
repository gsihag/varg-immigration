
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  Shield, 
  Target, 
  Zap, 
  Globe, 
  CheckCircle,
  Users,
  Award
} from 'lucide-react';

const RituAdvantage = () => {
  const advantages = [
    {
      icon: Zap,
      title: "Instant Expertise",
      description: "Get senior-level immigration advice immediately",
      highlight: "No waiting, no appointments"
    },
    {
      icon: Shield,
      title: "Always Updated", 
      description: "Connected to live government databases",
      highlight: "Real-time policy changes"
    },
    {
      icon: Target,
      title: "Completely Personal",
      description: "Every answer is crafted for your specific situation",
      highlight: "Tailored just for you"
    },
    {
      icon: CheckCircle,
      title: "Risk-Free",
      description: "Make informed decisions with confidence",
      highlight: "99.8% accuracy rate"
    },
    {
      icon: Clock,
      title: "Available Anytime",
      description: "No appointments, no waiting, no business hours",
      highlight: "24/7 support"
    },
    {
      icon: Globe,
      title: "Speaks Your Language",
      description: "Comfortable communication in English or Hindi",
      highlight: "Natural conversation"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Award className="w-8 h-8 text-australia-blue" />
          <h2 className="text-3xl font-bold text-gray-900">The Ritu Advantage</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          What makes Ritu different from traditional immigration advice?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((advantage, index) => {
          const IconComponent = advantage.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-australia-blue group">
              <CardContent className="p-6 text-center space-y-4">
                <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto group-hover:bg-australia-blue/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-australia-blue" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">{advantage.title}</h3>
                  <p className="text-sm text-gray-600">{advantage.description}</p>
                  <p className="text-xs font-medium text-australia-blue bg-australia-blue/10 px-2 py-1 rounded-full inline-block">
                    {advantage.highlight}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Problem-Solution Showcase */}
      <Card className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-center mb-6">Your Immigration Challenges → Ritu's Solutions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-red-200 mb-2">❌ Problem:</p>
                <p className="text-sm">"I don't know which visa is right for me"</p>
                <p className="font-semibold text-green-200 mt-2 mb-1">✅ Solution:</p>
                <p className="text-sm">Personalized visa recommendations based on your profile</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-red-200 mb-2">❌ Problem:</p>
                <p className="text-sm">"Immigration rules are too complex to understand"</p>
                <p className="font-semibold text-green-200 mt-2 mb-1">✅ Solution:</p>
                <p className="text-sm">Complex information explained in simple, clear language</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-red-200 mb-2">❌ Problem:</p>
                <p className="text-sm">"I'm worried about making costly mistakes"</p>
                <p className="font-semibold text-green-200 mt-2 mb-1">✅ Solution:</p>
                <p className="text-sm">Accurate guidance using official government sources</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-semibold text-red-200 mb-2">❌ Problem:</p>
                <p className="text-sm">"I can't afford expensive immigration advice"</p>
                <p className="font-semibold text-green-200 mt-2 mb-1">✅ Solution:</p>
                <p className="text-sm">Professional-level guidance available 24/7 for free</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RituAdvantage;
