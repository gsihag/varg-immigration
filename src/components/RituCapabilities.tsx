
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Brain, 
  Clock, 
  User, 
  FileText, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Users,
  Search,
  Target,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const RituCapabilities = () => {
  const capabilities = [
    {
      icon: MessageCircle,
      title: "Instant Immigration Answers",
      description: "Answer any Australian immigration question immediately",
      features: [
        "Explain visa types in simple language",
        "Clarify complex immigration rules and requirements", 
        "Provide updates on policy changes"
      ]
    },
    {
      icon: Target,
      title: "Personalized Visa Guidance", 
      description: "Analyze your specific situation and background",
      features: [
        "Recommend the best visa pathway for you",
        "Calculate your points for skilled migration",
        "Assess your eligibility for different visa categories"
      ]
    },
    {
      icon: FileText,
      title: "Step-by-Step Application Help",
      description: "Guide you through entire application process", 
      features: [
        "List exact documents you need for your case",
        "Explain how to prepare and submit applications",
        "Provide current processing times and expectations"
      ]
    },
    {
      icon: Clock,
      title: "Real-Time Information",
      description: "Access latest government updates and changes",
      features: [
        "Check current visa processing times",
        "Monitor policy updates from Department of Home Affairs", 
        "Provide accurate, up-to-date information only"
      ]
    }
  ];

  const workingProcess = [
    {
      step: 1,
      title: "You Ask Your Question",
      description: "Ask in plain English or Hindi - Ritu understands natural conversation"
    },
    {
      step: 2, 
      title: "AI Brain Analyzes",
      description: "Ritu's AI brain understands and analyzes your specific needs"
    },
    {
      step: 3,
      title: "Instant Database Search", 
      description: "She searches through vast immigration databases instantly"
    },
    {
      step: 4,
      title: "Find Relevant Information",
      description: "She finds the most relevant, current information for your case"
    },
    {
      step: 5,
      title: "Personalized Combination",
      description: "She combines official data with your personal situation"
    },
    {
      step: 6,
      title: "Clear Answer Delivery",
      description: "She delivers personalized advice in easy-to-understand language"
    }
  ];

  const smartMethods = [
    {
      icon: Brain,
      title: "AI Brain (OpenAI ChatGPT)",
      description: "Understands complex questions like a human expert"
    },
    {
      icon: Search,
      title: "Smart Memory (RAG System)", 
      description: "Stores and recalls vast immigration knowledge"
    },
    {
      icon: Globe,
      title: "Live Data Connection",
      description: "Always connected to official government sources"
    },
    {
      icon: User,
      title: "Personalization Engine",
      description: "Tailors every answer to your unique circumstances"
    }
  ];

  const specialFeatures = [
    {
      icon: Clock,
      title: "Always Current",
      description: "Updates with latest immigration changes daily"
    },
    {
      icon: MessageCircle,
      title: "Always Available", 
      description: "24/7 support in English and Hindi"
    },
    {
      icon: CheckCircle,
      title: "Always Accurate",
      description: "Uses only official government data"
    },
    {
      icon: Target,
      title: "Always Personal",
      description: "Every answer is tailored to your situation"
    },
    {
      icon: Shield,
      title: "Always Simple",
      description: "Explains complex processes in easy terms"
    },
    {
      icon: Zap,
      title: "Always Reliable",
      description: "Backed by advanced AI technology"
    }
  ];

  const sampleQuestions = [
    "What visa should I apply for as a software engineer?",
    "How many points do I need for skilled migration?", 
    "What documents do I need for partner visa?",
    "How long does student visa processing take?",
    "Can I bring my family on my work visa?"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Meet Ritu - Your Intelligent Immigration Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Think of Ritu as your personal immigration expert available 24/7. She uses advanced AI technology to understand your unique situation - like having an immigration consultant in your pocket.
        </p>
      </div>

      {/* What is Ritu AI */}
      <Card className="border-2 border-australia-blue/20 bg-gradient-to-r from-australia-blue/5 to-australia-darkBlue/5">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="bg-australia-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">What is Ritu AI?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <CheckCircle className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Australia's smartest AI immigration assistant</p>
              </div>
              <div className="space-y-2">
                <Clock className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Personal immigration expert available 24/7</p>
              </div>
              <div className="space-y-2">
                <Brain className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Advanced AI technology for unique situations</p>
              </div>
              <div className="space-y-2">
                <User className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Immigration consultant in your pocket</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What Can Ritu Do */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">What Can Ritu Do For You?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <Card key={index} className="border-l-4 border-l-australia-blue hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-australia-blue/10 rounded-full p-3 flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-australia-blue" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-900">{capability.title}</h3>
                      <p className="text-gray-600">{capability.description}</p>
                      <ul className="space-y-1">
                        {capability.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-700 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
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
      </div>

      {/* How Does Ritu Work */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">How Does Ritu Work?</h2>
          <p className="text-gray-600">Behind the scenes - explained simply</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workingProcess.map((process, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-australia-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {process.step}
                    </div>
                    <h3 className="font-semibold text-gray-900">{process.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{process.description}</p>
                </div>
                {index < workingProcess.length - 1 && (
                  <ArrowRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-australia-blue hidden lg:block" />
                )}
              </CardContent>
            </Card>
          ))}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* What Makes Ritu Special */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">What Makes Ritu Special?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 rounded-full p-2">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Try Asking Ritu */}
      <Card className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
        <CardContent className="p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold">Try Asking Ritu</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {sampleQuestions.map((question, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3 text-sm hover:bg-white/20 transition-colors cursor-pointer">
                "{question}"
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-lg">Ready to get personalized immigration advice?</p>
            <Button 
              size="lg" 
              className="bg-white text-australia-blue hover:bg-gray-100 font-semibold px-8 py-3"
              onClick={() => {
                const chatSection = document.querySelector('.ritu-chat-section');
                if (chatSection) {
                  chatSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Chatting with Ritu Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RituCapabilities;
