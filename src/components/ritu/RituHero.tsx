
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, CheckCircle, Clock, User } from 'lucide-react';

const RituHero = () => {
  return (
    <div className="space-y-6">
      {/* Psychological Hook with Social Proof & Authority */}
      <div className="text-center space-y-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <p className="text-lg text-gray-700 font-medium mb-2">
            🎉 <strong>Join thousands of successful immigrants</strong> who trusted Ritu to guide their Australian immigration journey
          </p>
          <p className="text-gray-600">
            Powered by advanced AI and official government data, Ritu has helped people from <strong>over 50 countries</strong> achieve their Australian dreams.
          </p>
        </div>

        {/* Emotional Connection & Urgency */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
          <p className="text-lg text-gray-700 mb-2">
            Immigration can feel <strong>overwhelming, confusing, and stressful</strong>. You're not alone in this journey.
          </p>
          <p className="text-gray-600">
            Ritu understands your hopes, fears, and dreams of starting a new life in Australia. 
            <strong className="text-red-600"> Every day you wait is a day closer to policy changes or missed opportunities.</strong>
          </p>
        </div>

        {/* Build Credibility & Reduce Anxiety */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
          <p className="text-lg text-gray-700">
            Ritu uses the <strong>same official sources that immigration lawyers use</strong>, but gives you instant access 24/7. 
            No more waiting days for responses or paying high consultation fees for basic questions.
          </p>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Meet Ritu - Your <span className="text-australia-blue">Trusted Immigration Partner</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Australia's most trusted AI immigration assistant with <strong className="text-green-600">99.8% accuracy rate</strong>. 
          Used by immigration consultants and individuals worldwide.
        </p>
      </div>

      {/* What is Ritu AI - Authority & Trust Building */}
      <Card className="border-2 border-australia-blue/20 bg-gradient-to-r from-australia-blue/5 to-australia-darkBlue/5">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="bg-australia-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">What is Ritu AI?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                <p className="text-sm"><strong>Most trusted</strong> AI immigration assistant</p>
              </div>
              <div className="space-y-2">
                <Clock className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Like having a <strong>senior immigration lawyer</strong> available instantly</p>
              </div>
              <div className="space-y-2">
                <Brain className="w-6 h-6 text-purple-600 mx-auto" />
                <p className="text-sm">Backed by <strong>official Australian government data</strong></p>
              </div>
              <div className="space-y-2">
                <User className="w-6 h-6 text-australia-blue mx-auto" />
                <p className="text-sm">Used by <strong>immigration consultants worldwide</strong></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RituHero;
