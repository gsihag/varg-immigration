
import React from 'react';

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
  children?: React.ReactNode;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  show,
  animationClass,
  children,
}) => {
  return (
    <div
      className={`
        absolute inset-0 p-5 lg:p-6 transition-all duration-350 ease-in-out flex flex-col justify-between
        ${show ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'} ${animationClass}
      `}
      style={{ animationFillMode: 'both' }}
      aria-hidden={!show}
    >
      {/* Main testimonial content */}
      <div className="grow flex flex-col justify-center">
        <div className="text-center mb-3">
          <div className="text-4xl mb-3 float-animation">{testimonial.avatar}</div>
          <div className="inline-block rounded-full px-3 py-1 text-white font-bold text-xs mb-3" 
               style={{ background: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(20, 184, 166))' }}>
            {testimonial.highlight}
          </div>
          <blockquote className="text-lg lg:text-xl text-slate-700 mb-4 italic font-medium leading-relaxed">
            &quot;{testimonial.text}&quot;
          </blockquote>
          <div className="flex justify-center mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" style={{ fill: 'rgb(234, 88, 12)', color: 'rgb(234, 88, 12)' }}>
                <polygon points="12,17.75 5.95,21 7.13,13.97 2,9.24 9.03,8.18 12,2 14.97,8.18 22,9.24 16.87,13.97 18.05,21" />
              </svg>
            ))}
          </div>
          <div className="font-bold text-base text-slate-800" 
               style={{ background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216), rgb(147, 51, 234))', 
                       WebkitBackgroundClip: 'text', 
                       WebkitTextFillColor: 'transparent', 
                       backgroundClip: 'text' }}>
            {testimonial.name}
          </div>
          <div className="text-slate-600 font-medium text-sm">{testimonial.role}</div>
          <div className="font-bold text-sm" style={{ color: 'rgb(37, 99, 235)' }}>{testimonial.location}</div>
        </div>
      </div>
      {/* Navigation at the bottom with proper spacing */}
      <div className="w-full flex flex-col items-center mt-4 pt-4 border-t border-slate-100">
        {children}
      </div>
    </div>
  );
};

export default TestimonialCard;
