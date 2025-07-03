
import React from 'react';
import { Trophy, Target, Zap, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: '5,000+', label: 'Success Stories', icon: <Trophy className="w-4 h-4" />, color: 'text-action-orange' },
    { number: '98%', label: 'Success Rate', icon: <Target className="w-4 h-4" />, color: 'text-success-green' },
    { number: '24/7', label: 'AI Support', icon: <Zap className="w-4 h-4" />, color: 'text-energy-pink' },
    { number: '15+', label: 'Years Experience', icon: <Star className="w-4 h-4" />, color: 'text-confidence-purple' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group hover:scale-110 transition-all duration-300 cursor-pointer interactive-card">
          <div className={`flex justify-center mb-1 ${stat.color} group-hover:animate-bounce`}>
            {stat.icon}
          </div>
          <div className="text-lg lg:text-xl font-bold text-action-warm mb-1">{stat.number}</div>
          <div className="text-xs text-action-warm font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
