
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
}) => {
  // Show only 3 dots maximum, sliding window
  let visibleDots: number[] = [];
  if (testimonialCount <= 3) {
    visibleDots = Array.from({ length: testimonialCount }, (_, i) => i);
  } else {
    // Sliding window for 3 dots
    if (activeIndex === 0) visibleDots = [0, 1, 2];
    else if (activeIndex === testimonialCount - 1) visibleDots = [testimonialCount - 3, testimonialCount - 2, testimonialCount - 1];
    else visibleDots = [activeIndex - 1, activeIndex, activeIndex + 1];
  }

  return (
    <div className="flex items-center justify-center gap-6 w-full">
      {/* Arrow left */}
      <button
        aria-label="Previous review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 shadow-md w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        style={{ 
          color: 'rgb(234, 88, 12)',
          '&:hover': {
            color: 'white',
            backgroundColor: 'rgb(234, 88, 12)'
          }
        }}
        onClick={onPrev}
        disabled={animating}
        tabIndex={0}
        type="button"
      >
        <ArrowLeft className="w-2.5 h-2.5" />
      </button>

      {/* The Dots */}
      <div className="flex justify-center gap-2 relative">
        {visibleDots.map((idx) => (
          <button
            key={idx}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx 
                ? 'scale-125 shadow-lg'
                : 'hover:bg-slate-400'
            }`}
            style={{
              backgroundColor: activeIndex === idx ? 'rgb(234, 88, 12)' : 'rgb(203, 213, 225)'
            }}
            onClick={() => onDotClick(idx)}
            disabled={animating}
            type="button"
          />
        ))}
      </div>
      
      {/* Arrow right */}
      <button
        aria-label="Next review"
        className="bg-white bg-opacity-70 hover:bg-opacity-100 shadow-md w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
        style={{ 
          color: 'rgb(234, 88, 12)',
          '&:hover': {
            color: 'white',
            backgroundColor: 'rgb(234, 88, 12)'
          }
        }}
        onClick={onNext}
        disabled={animating}
        tabIndex={0}
        type="button"
      >
        <ArrowRight className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default TestimonialNavigation;
