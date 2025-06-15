
import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    location: string;
    text: string;
    rating: number;
    avatar: string;
    highlight: string;
  };
  show: boolean;
  animationClass: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, show, animationClass }) => {
  return (
    <div
      className={`
        absolute inset-0 p-5 lg:p-6 transition-all duration-350 ease-in-out
        ${show ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'} ${animationClass}
      `}
      style={{ animationFillMode: 'both' }}
      aria-hidden={!show}
    >
      <div className="text-center mb-7"> {/* This mb-7 ensures space between content and dots/navigation */}
        <div className="text-4xl mb-3 float-animation">{testimonial.avatar}</div>
        <div className="inline-block bg-gradient-success rounded-full px-3 py-1 text-white font-bold text-xs mb-3">
          {testimonial.highlight}
        </div>
        <blockquote className="text-lg lg:text-xl text-slate-700 mb-4 italic font-medium leading-relaxed">
          &quot;{testimonial.text}&quot;
        </blockquote>
        <div className="flex justify-center mb-3">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-action-orange text-action-orange" />
          ))}
        </div>
        <div className="font-bold text-base text-slate-800 gradient-text-blue">{testimonial.name}</div>
        <div className="text-slate-600 font-medium text-sm">{testimonial.role}</div>
        <div className="text-trust-blue font-bold text-sm">{testimonial.location}</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
