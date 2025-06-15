
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Brain, Search, Target, User, MessageCircle, Lightbulb } from 'lucide-react';

const RituWorkingProcess = () => {
  const workingProcess = [
    {
      step: 1,
      icon: MessageCircle,
      title: "You Ask Your Question",
      description: "Ask in plain English or Hindi - Ritu understands natural conversation",
      color: "bg-blue-500"
    },
    {
      step: 2, 
      icon: Brain,
      title: "AI Brain Analyzes",
      description: "Ritu's AI brain understands and analyzes your specific needs",
      color: "bg-purple-500"
    },
    {
      step: 3,
      icon: Search,
      title: "Instant Database Search", 
      description: "She searches through vast immigration databases instantly",
      color: "bg-green-500"
    },
    {
      step: 4,
      icon: Target,
      title: "Find Relevant Information",
      description: "She finds the most relevant, current information for your case",
      color: "bg-orange-500"
    },
    {
      step: 5,
      icon: User,
      title: "Personalized Combination",
      description: "She combines official data with your personal situation",
      color: "bg-pink-500"
    },
    {
      step: 6,
      icon: Lightbulb,
      title: "Clear Answer Delivery",
      description: "She delivers personalized advice in easy-to-understand language",
      color: "bg-australia-blue"
    }
  ];

  const smartMethods = [
    {
      icon: Brain,
      title: "AI Brain (OpenAI ChatGPT)",
      description: "Understands complex questions like a human expert",
      detail: "Advanced natural language processing"
    },
    {
      icon: Search,
      title: "Smart Memory (RAG System)", 
      description: "Stores and recalls vast immigration knowledge",
      detail: "Instant access to thousands of immigration cases"
    },
    {
      icon: Target,
      title: "Live Data Connection",
      description: "Always connected to official government sources",
      detail: "Real-time updates from Department of Home Affairs"
    },
    {
      icon: User,
      title: "Personalization Engine",
      description: "Tailors every answer to your unique circumstances",
      detail: "Considers your background, goals, and situation"
    }
  ];

  return (
    <div className="space-y-12">
      {/* How Does Ritu Work */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">How Does Ritu Work?</h2>
          <p className="text-gray-600">Behind the scenes - explained simply</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workingProcess.map((process, index) => {
            const IconComponent = process.icon;
            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`${process.color} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold`}>
                        {process.step}
                      </div>
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{process.title}</h3>
                    <p className="text-sm text-gray-600">{process.description}</p>
                  </div>
                  {index < workingProcess.length - 1 && (
                    <ArrowRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-australia-blue hidden lg:block" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Smart Methods */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Ritu's Smart Methods</h2>
          <p className="text-gray-600">Advanced technology explained in simple terms</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {smartMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-t-4 border-t-australia-blue">
                <CardContent className="p-6 space-y-4">
                  <div className="bg-australia-blue/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                    <IconComponent className="w-6 h-6 text-australia-blue" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{method.title}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                  <p className="text-xs text-australia-blue font-medium bg-australia-blue/10 px-2 py-1 rounded-full">
                    {method.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RituWorkingProcess;
