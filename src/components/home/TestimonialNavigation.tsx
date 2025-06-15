
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
  const { start, end } = getDotRange(testimonialCount, activeIndex);
  const visibleDots = Array.from({ length: Math.min(3, testimonialCount) }, (_, i) => start + i);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-6 pt-0">
        <button
          aria-label="Previous review"
          className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
          onClick={onPrev}
          disabled={animating}
          tabIndex={0}
          style={{ outline: 'none' }}
          type="button"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

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

        <button
          aria-label="Next review"
          className="bg-white bg-opacity-70 hover:bg-opacity-100 text-action-orange hover:text-white hover:bg-action-orange shadow-md w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border border-slate-200 hover:scale-110"
          onClick={onNext}
          disabled={animating}
          tabIndex={0}
          style={{ outline: 'none' }}
          type="button"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialNavigation;
