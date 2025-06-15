
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

const getDotRange = (testimonialCount: number, activeIndex: number) => {
  if (testimonialCount <= 3) {
    return { start: 0, end: testimonialCount };
  }
  if (activeIndex === 0) return { start: 0, end: 3 };
  if (activeIndex === testimonialCount - 1) return { start: testimonialCount - 3, end: testimonialCount };
  return { start: activeIndex - 1, end: activeIndex + 2 };
};

const TestimonialNavigation: React.FC<TestimonialNavigationProps> = ({
  testimonialCount,
  activeIndex,
  onDotClick,
  onPrev,
  onNext,
  animating
}) => {
  // Manage sliding dot window. Always show at most 3 dots.
  let visibleDots: number[] = [];
  if (testimonialCount <= 3) {
    visibleDots = Array.from({ length: testimonialCount }, (_, i) => i);
  } else {
    // Sliding window for 3 dots
    if (activeIndex === 0) visibleDots = [0,1,2];
    else if (activeIndex === testimonialCount-1) visibleDots = [testimonialCount-3, testimonialCount-2, testimonialCount-1];
    else visibleDots = [activeIndex-1, activeIndex, activeIndex+1];
  }

  return (
    <div className="flex items-center justify-center gap-6 w-full">
      {/* Arrow left */}
      <button
        aria-label="Previous review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        onClick={onPrev}
        disabled={animating}
        tabIndex={0}
        style={{ outline: 'none' }}
        type="button"
      >
        <ArrowLeft className="w-3 h-3" /> {/* Smol arrow! */}
      </button>

      {/* The Dots */}
      <div className="flex justify-center gap-2 relative">
        {visibleDots.map((idx) => (
          <button
            key={idx}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300
              ${activeIndex === idx 
                ? 'bg-action-orange scale-125 shadow-lg'
                : 'bg-slate-300 hover:bg-slate-400'}`}
            onClick={() => onDotClick(idx)}
            disabled={animating}
            type="button"
          />
        ))}
      </div>
      {/* Arrow right */}
      <button
        aria-label="Next review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        onClick={onNext}
        disabled={animating}
        tabIndex={0}
        style={{ outline: 'none' }}
        type="button"
      >
        <ArrowRight className="w-3 h-3" /> {/* Smol arrow! */}
      </button>
    </div>
  );
};

export default TestimonialNavigation;
