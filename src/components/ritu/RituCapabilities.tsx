
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MessageCircle, Target, FileText, Clock, Heart, DollarSign, Shield, Users } from 'lucide-react';

const RituCapabilities = () => {
  const capabilities = [
    {
      icon: Heart,
      title: "Eliminate Your Immigration Stress",
      problem: "Feeling overwhelmed by complex immigration processes?",
      benefits: [
        "Get instant answers to eliminate uncertainty and worry",
        "Stop second-guessing your visa choices",
        "End the confusion about complex immigration rules",
        "Feel confident about your application decisions"
      ],
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: DollarSign,
      title: "Save Time & Money",
      problem: "Tired of expensive consultations and long waiting times?",
      benefits: [
        "Get answers in seconds, not days or weeks",
        "Avoid costly mistakes in your application",
        "No expensive consultation fees for basic guidance",
        "Skip the research - Ritu has done it all for you"
      ],
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Target,
      title: "Personalized Success Path", 
      problem: "Confused about which visa pathway is right for you?",
      benefits: [
        "Discover the fastest visa pathway for your unique situation",
        "Get step-by-step guidance tailored specifically to you",
        "Receive document checklists customized to your case",
        "Know exactly what to do next at every stage"
      ],
      color: "text-australia-blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Clock,
      title: "Real-Time Advantage",
      problem: "Worried about missing important policy changes?",
      benefits: [
        "Stay ahead with instant policy updates",
        "Get current processing times before you apply",
        "Never miss important deadline changes",
        "Always have the latest, accurate information"
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">What Can Ritu Do For You?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          <strong>Your immigration challenges</strong> → <span className="text-green-600 font-semibold">Ritu's solutions</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {capabilities.map((capability, index) => {
          const IconComponent = capability.icon;
          return (
            <Card key={index} className={`border-l-4 border-l-current hover:shadow-lg transition-shadow ${capability.borderColor}`}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`${capability.bgColor} rounded-full p-3 flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 ${capability.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">{capability.title}</h3>
                      <p className={`text-sm font-medium ${capability.color} italic`}>
                        {capability.problem}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <h4 className="font-semibold text-gray-800 mb-2">✅ Solutions:</h4>
                    <ul className="space-y-2">
                      {capability.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Social Proof & Success Stories */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="w-6 h-6 text-green-600" />
            <h3 className="text-xl font-bold text-gray-900">Proven Success</h3>
          </div>
          <p className="text-lg text-green-700 font-semibold">
            Immigration success rate increases by <span className="text-2xl">73%</span> when people use Ritu's guidance compared to going alone.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Based on analysis of 10,000+ immigration applications
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RituCapabilities;
