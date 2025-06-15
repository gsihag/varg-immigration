
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
  <div className="w-full flex flex-col items-center mt-7">
    {/* Arrow Navigation */}
    <div className="flex items-center justify-center gap-12 mb-4">
      <button
        aria-label="Previous review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        onClick={onPrev}
        disabled={animating}
        tabIndex={0}
        style={{ outline: 'none' }}
        type="button"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <button
        aria-label="Next review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        onClick={onNext}
        disabled={animating}
        tabIndex={0}
        style={{ outline: 'none' }}
        type="button"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
    {/* Dots Navigation */}
    <div className="flex justify-center mt-2 gap-2 z-30 relative">
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
