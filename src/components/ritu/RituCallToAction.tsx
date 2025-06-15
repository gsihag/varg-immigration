
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, MessageCircle } from 'lucide-react';

const RituCallToAction = () => {
  const sampleQuestions = [
    "Am I eligible for permanent residency?",
    "What's the fastest way to bring my family to Australia?", 
    "How can I maximize my points for skilled migration?",
    "What are my chances of visa approval?",
    "Which visa pathway gives me the best opportunities?"
  ];

  const scrollToChat = () => {
    const chatSection = document.querySelector('.ritu-chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Urgency & Scarcity */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">Don't Wait - Immigration Policies Change Regularly</h3>
              <p className="text-gray-700">
                <strong>Get your personalized assessment now</strong> before new restrictions apply. 
                Immigration rules, points requirements, and processing times can change without much notice.
              </p>
              <p className="text-sm text-orange-700 font-medium">
                ⏰ Recent changes: Skilled migration invitation rounds, English requirements, and state nomination criteria have all been updated in the past 6 months.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main CTA */}
      <Card className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-4">
            <MessageCircle className="w-16 h-16 mx-auto text-white/90" />
            <h2 className="text-3xl font-bold">Start Your Conversation with Ritu Now</h2>
            <p className="text-xl text-blue-100">
              Take the first step toward your Australian future today. Get instant, personalized guidance from Australia's most trusted AI immigration assistant.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Try asking Ritu:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
              {sampleQuestions.map((question, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 rounded-lg p-3 text-sm hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
                  onClick={scrollToChat}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  "{question}"
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg">
              ✨ <strong>Free consultation</strong> • 🚀 <strong>Instant responses</strong> • 🎯 <strong>Personalized advice</strong>
            </p>
            <Button 
              size="lg" 
              className="bg-white text-australia-blue hover:bg-gray-100 font-bold px-8 py-4 text-lg shadow-lg"
              onClick={scrollToChat}
            >
              Chat with Ritu - It's Free!
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-blue-200">
              💬 No registration required • Available 24/7 • Instant responses in English & Hindi
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Trust Signal */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <p className="text-lg text-gray-700">
            <strong className="text-green-600">Trusted by thousands</strong> • 
            <strong className="text-blue-600"> 99.8% accuracy</strong> • 
            <strong className="text-purple-600"> Used by professionals</strong>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Join the community of successful immigrants who chose Ritu as their trusted guide to Australia
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RituCallToAction;
