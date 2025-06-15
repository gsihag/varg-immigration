
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TestimonialNavigationProps {
  testimonialCount: number;
  activeIndex: number;
  onDotClick: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  animating: boolean;
}

const TestimonialNavigation: React.FC<TestimonialNavigationProps> = ({
  testimonialCount,
  activeIndex,
  onDotClick,
  onPrev,
  onNext,
  animating
}) => (
  <div className="relative w-full flex flex-col items-center">
    {/* Arrow Navigation */}
    <button
      aria-label="Previous review"
      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
      onClick={onPrev}
      disabled={animating}
      tabIndex={0}
      style={{ outline: 'none' }}
      type="button"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
    <button
      aria-label="Next review"
      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
      onClick={onNext}
      disabled={animating}
      tabIndex={0}
      style={{ outline: 'none' }}
      type="button"
    >
      <ArrowRight className="w-5 h-5" />
    </button>
    {/* Dots Navigation */}
    <div className="flex justify-center mt-8 gap-2 z-30 relative">
      {Array.from({ length: testimonialCount }).map((_, idx) => (
        <button
          key={idx}
          aria-label={`Go to testimonial ${idx + 1}`}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300
            ${activeIndex === idx 
              ? 'bg-action-orange scale-125 shadow-lg'
              : 'bg-slate-300 hover:bg-slate-400'}`
          }
          onClick={() => onDotClick(idx)}
          disabled={animating}
          type="button"
        />
      ))}
    </div>
  </div>
);

export default TestimonialNavigation;

