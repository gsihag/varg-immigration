
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    { 
      name: 'Skilled Migration Consulting', 
      description: 'Fast-track your career with AI-guided skilled visa consultation. Get personalized pathway recommendations instantly.',
      icon: '🎯',
      popular: true,
      successRate: '96%',
      avgTime: '6-8 months',
      gradient: 'from-trust-blue to-confidence-purple'
    },
    { 
      name: 'Family & Partner Visa Guidance', 
      description: 'Reunite with loved ones faster. Our personalized AI ensures your family visa consultation is perfect from day one.',
      icon: '❤️',
      popular: false,
      successRate: '94%',
      avgTime: '12-18 months',
      gradient: 'from-warmth-coral to-energy-pink'
    },
    { 
      name: 'Student Visa Support', 
      description: 'Start your Australian education journey with confidence. Personalized AI-powered consultation from start to finish.',
      icon: '🎓',
      popular: true,
      successRate: '99%',
      avgTime: '4-6 weeks',
      gradient: 'from-success-green to-calm-teal'
    },
    { 
      name: 'Work Visa Consulting', 
      description: 'Secure your Australian work opportunity with expert AI guidance and strategic consultation.',
      icon: '💼',
      popular: false,
      successRate: '91%',
      avgTime: '8-12 months',
      gradient: 'from-action-orange to-action-warm'
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            <span className="gradient-text">Complete Migration</span> Consultancy
          </h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Comprehensive immigration consultancy services tailored to your unique situation and goals with personalized AI support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <Card key={index} className={`group cursor-pointer border-2 hover:border-opacity-60 interactive-card ${service.popular ? 'ring-4 ring-action-orange/20 shadow-xl border-action-orange/30' : 'border-slate-200'}`}>
              <CardContent className="p-5 relative bg-white">
                {service.popular && (
                  <div className="absolute -top-2 left-3 bg-gradient-action text-white px-3 py-1 rounded-full text-xs font-bold shadow-xl attention-grab">
                    🔥 Most Popular
                  </div>
                )}
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300 float-animation">{service.icon}</div>
                <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-trust-blue transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-3 font-medium text-sm">{service.description}</p>
                
                {/* Success Metrics */}
                <div className={`flex justify-between items-center mb-3 p-2 bg-gradient-to-r ${service.gradient} bg-opacity-10 rounded-lg border border-opacity-20`}>
                  <div className="text-center">
                    <div className="text-sm font-bold text-success-green">{service.successRate}</div>
                    <div className="text-xs text-slate-600 font-medium">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-trust-blue">{service.avgTime}</div>
                    <div className="text-xs text-slate-600 font-medium">Avg. Time</div>
                  </div>
                </div>
                
                <div className="text-trust-blue font-bold group-hover:text-action-orange transition-colors flex items-center justify-between text-sm">
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" className="group bg-gradient-action hover:shadow-2xl text-white text-base px-8 py-3 rounded-xl magnetic-hover attention-grab font-bold" asChild>
            <Link to="/meeting">
              <MessageCircle className="mr-2 w-4 h-4 group-hover:animate-pulse" />
              Start with Ritu AI - It's FREE!
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
