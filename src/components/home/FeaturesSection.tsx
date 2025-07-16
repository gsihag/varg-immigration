
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Clock, Shield } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: 'Personalized AI Guidance',
      description: 'Get instant, tailored answers from Ritu - your personal AI consultant trained on 10,000+ successful applications and Australian immigration law',
      highlight: 'Personalized',
      color: 'text-trust-blue',
      bgGradient: 'from-trust-blue/10 to-confidence-purple/10',
      borderColor: 'border-trust-blue/20'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Expert Human Consultants',
      description: 'Best-in-business migration consultants ready to handle complex cases with personal attention and years of expertise',
      highlight: 'Best in Business',
      color: 'text-action-orange',
      bgGradient: 'from-action-orange/10 to-action-warm/10',
      borderColor: 'border-action-orange/20'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Faster Processing',
      description: 'Personalized AI-assisted document preparation and error detection reduces consultation time significantly',
      highlight: '50% Faster',
      color: 'text-success-green',
      bgGradient: 'from-success-green/10 to-calm-teal/10',
      borderColor: 'border-success-green/20'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Guaranteed Accuracy',
      description: 'Our personalized AI ensures error-free consultation with human expert verification and guidance',
      highlight: '100% Accurate',
      color: 'text-energy-pink',
      bgGradient: 'from-energy-pink/10 to-confidence-purple/10',
      borderColor: 'border-energy-pink/20'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            Why Choose <span className="gradient-text">VARG Immigration</span>?
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium">
            We combine cutting-edge personalized AI technology with Australia's best migration consultancy to deliver <span className="font-bold text-trust-blue">unmatched migration success</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <Card key={index} className={`group border-2 ${feature.borderColor} hover:border-opacity-60 interactive-card bg-gradient-to-br ${feature.bgGradient} hover:shadow-2xl`}>
              <CardContent className="p-5 text-center relative overflow-hidden">
                <div className={`absolute top-0 right-0 bg-gradient-action text-white text-xs font-bold px-2 py-1 rounded-bl-xl shadow-lg`}>
                  {feature.highlight}
                </div>
                <div className={`mb-3 flex justify-center ${feature.color} group-hover:scale-125 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-trust-blue transition-colors">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
