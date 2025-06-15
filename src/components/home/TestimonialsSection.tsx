
import React, { useState, useEffect, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      location: "Sydney, Australia",
      text: "Ritu AI made my PR consultation effortless! The personalized guidance was like having a migration expert in my pocket 24/7.",
      rating: 5,
      avatar: "👩‍💻",
      highlight: "Got PR in 8 months!",
    },
    {
      name: "Ahmed Hassan",
      role: "Business Analyst",
      location: "Melbourne, Australia", 
      text: "The personalized AI predicted every requirement before I even asked. Saved me months of research and thousands in consultant fees.",
      rating: 5,
      avatar: "👨‍💼",
      highlight: "Saved $5,000+"
    },
    {
      name: "Maria Rodriguez",
      role: "Nurse",
      location: "Perth, Australia",
      text: "VARG's human touch combined with personalized AI precision made my family reunion possible. Emotional and efficient support!",
      rating: 5,
      avatar: "👩‍⚕️",
      highlight: "Family reunited!"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    // Reset animation state before starting interval
    if (animating) return;
    timeoutRef.current = window.setTimeout(() => {
      handleNext();
    }, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTestimonial, animating]);

  const handleAnimation = (callback: () => void, dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      callback();
      setAnimating(false);
    }, 350);
  };

  const handleNext = () => {
    handleAnimation(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 'right');
  };

  const handlePrev = () => {
    handleAnimation(() => {
      setActiveTestimonial((prev) =>
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }, 'left');
  };

  const goToTestimonial = (idx: number) => {
    if (animating || idx === activeTestimonial) return;
    setDirection(idx > activeTestimonial ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setActiveTestimonial(idx);
      setAnimating(false);
    }, 350);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
            <span className="gradient-text">Real Stories</span>, Real Success
          </h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-action-orange text-action-orange" />
            ))}
            <span className="ml-2 text-slate-700 font-bold text-sm">4.9/5 from 2,000+ happy clients</span>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-2xl p-5 lg:p-6 relative overflow-hidden border border-slate-200 min-h-[370px]">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-action" />
            
            {/* Testimonial transitions */}
            <div className="relative h-full min-h-[290px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => {
                // Only render the active and previous/next for animation performance
                if (
                  index === activeTestimonial ||
                  (direction === 'right' && index === (activeTestimonial - 1 + testimonials.length) % testimonials.length) ||
                  (direction === 'left' && index === (activeTestimonial + 1) % testimonials.length)
                ) {
                  return (
                    <div
                      key={index}
                      className={`
                        absolute inset-0 p-5 lg:p-6 transition-all duration-350 ease-in-out 
                        ${index === activeTestimonial
                          ? `opacity-100 z-10 ${animating
                            ? (direction === 'right'
                              ? 'animate-[slide-in-right_0.35s_ease-out]'
                              : 'animate-[slide-in-left_0.35s_ease-out]')
                            : 'animate-fade-in'}`
                          : `opacity-0 z-0 pointer-events-none 
                              ${animating
                                ? (direction === 'right'
                                  ? 'animate-[slide-out-left_0.35s_ease-in]'
                                  : 'animate-[slide-out-right_0.35s_ease-in]')
                                : ''}`}
                      `}
                      style={{ animationFillMode: 'both' }}
                    >
                      <div className="text-center">
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
                }
                return null;
              })}
              {/* Arrow navigation */}
              <button
                aria-label="Previous review"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
                onClick={handlePrev}
                disabled={animating}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                aria-label="Next review"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
                onClick={handleNext}
                disabled={animating}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {/* Dots navigation */}
            <div className="flex justify-center mt-6 gap-2 z-30 relative">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                    ${index === activeTestimonial 
                      ? 'bg-action-orange scale-125 shadow-lg' 
                      : 'bg-slate-300 hover:bg-slate-400'}`
                  }
                  onClick={() => goToTestimonial(index)}
                  disabled={animating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Animations — Tailwind with custom keyframes */}
      <style>{`
        @keyframes slide-in-right {
          from {opacity: 0; transform: translateX(72px);}
          to {opacity: 1; transform: translateX(0);}
        }
        @keyframes slide-in-left {
          from {opacity: 0; transform: translateX(-72px);}
          to {opacity: 1; transform: translateX(0);}
        }
        @keyframes slide-out-left {
          from {opacity: 1; transform: translateX(0);}
          to {opacity: 0; transform: translateX(-72px);}
        }
        @keyframes slide-out-right {
          from {opacity: 1; transform: translateX(0);}
          to {opacity: 0; transform: translateX(72px);}
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
