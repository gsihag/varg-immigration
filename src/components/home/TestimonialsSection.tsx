
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import TestimonialNavigation from './TestimonialNavigation';

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

type Direction = 'left' | 'right';

const AUTO_ROTATE_DELAY = 5000; // 5 seconds of inactivity before restarting autorotate

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState<Direction>('right');
  const [animating, setAnimating] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const inactivityTimeout = useRef<number | null>(null);
  const autoRotateTimeout = useRef<number | null>(null);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      inactivityTimeout.current && clearTimeout(inactivityTimeout.current);
      autoRotateTimeout.current && clearTimeout(autoRotateTimeout.current);
    };
  }, []);

  // Auto-rotate logic (only when user not recently active)
  useEffect(() => {
    // Clear any previous auto-rotation
    autoRotateTimeout.current && clearTimeout(autoRotateTimeout.current);

    if (userActive) return; // If user just interacted, don't auto-rotate

    autoRotateTimeout.current = window.setTimeout(() => {
      handleNext('auto');
    }, AUTO_ROTATE_DELAY);

    return () => {
      autoRotateTimeout.current && clearTimeout(autoRotateTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTestimonial, userActive]);

  // When user interacts, stop auto-rotation temporarily,
  // and after inactivity for AUTO_ROTATE_DELAY, resume auto-rotation
  const setUserInteraction = () => {
    setUserActive(true);
    inactivityTimeout.current && clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = window.setTimeout(() => {
      setUserActive(false);
    }, AUTO_ROTATE_DELAY);
  };

  // Animation handling
  const animateSwitch = (callback: () => void, dir: Direction) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      callback();
      setAnimating(false);
    }, 350);
  };

  const handleNext = (mode: 'user' | 'auto' = 'user') => {
    if (!animating) {
      animateSwitch(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 'right');
    }
    if (mode === 'user') setUserInteraction();
  };

  const handlePrev = () => {
    if (!animating) {
      animateSwitch(() => {
        setActiveTestimonial((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1
        );
      }, 'left');
    }
    setUserInteraction();
  };

  const goToTestimonial = (idx: number) => {
    if (animating || idx === activeTestimonial) return;
    setDirection(idx > activeTestimonial ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setActiveTestimonial(idx);
      setAnimating(false);
    }, 350);
    setUserInteraction();
  };

  // Animation classes for current/transitioning slides
  const getAnimationClass = (idx: number): string => {
    if (idx === activeTestimonial) {
      if (animating) {
        return direction === 'right'
          ? 'animate-[slide-in-right_0.35s_ease-out]'
          : 'animate-[slide-in-left_0.35s_ease-out]';
      } else {
        return 'animate-fade-in';
      }
    } else {
      if (animating) {
        // figure out which is outgoing?
        if (
          (direction === 'right' &&
            idx === (activeTestimonial - 1 + testimonials.length) % testimonials.length) ||
          (direction === 'left' &&
            idx === (activeTestimonial + 1) % testimonials.length)
        ) {
          return direction === 'right'
            ? 'animate-[slide-out-left_0.35s_ease-in]'
            : 'animate-[slide-out-right_0.35s_ease-in]';
        }
      }
      return '';
    }
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
                // Only active, prev, next for animation
                const isShow =
                  index === activeTestimonial ||
                  (direction === 'right' && index === (activeTestimonial - 1 + testimonials.length) % testimonials.length) ||
                  (direction === 'left' && index === (activeTestimonial + 1) % testimonials.length);
                return isShow ? (
                  <TestimonialCard
                    key={index}
                    testimonial={testimonial}
                    show={index === activeTestimonial}
                    animationClass={getAnimationClass(index)}
                  />
                ) : null;
              })}
            </div>
            {/* Navigation (arrows and dots) - dots now at the very bottom */}
            <TestimonialNavigation
              testimonialCount={testimonials.length}
              activeIndex={activeTestimonial}
              onDotClick={goToTestimonial}
              onPrev={handlePrev}
              onNext={handleNext}
              animating={animating}
            />
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

