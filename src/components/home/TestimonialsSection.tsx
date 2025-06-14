
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      location: "Sydney, Australia",
      text: "Ritu AI made my PR consultation effortless! The personalized guidance was like having a migration expert in my pocket 24/7.",
      rating: 5,
      avatar: "👩‍💻",
      highlight: "Got PR in 8 months!"
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
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-5 lg:p-6 relative overflow-hidden border border-slate-200">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-action"></div>
            
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === activeTestimonial ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-8 absolute inset-0 p-5 lg:p-6'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 float-animation">{testimonial.avatar}</div>
                  <div className="inline-block bg-gradient-success rounded-full px-3 py-1 text-white font-bold text-xs mb-3">
                    {testimonial.highlight}
                  </div>
                  <blockquote className="text-lg lg:text-xl text-slate-700 mb-4 italic font-medium leading-relaxed">
                    "{testimonial.text}"
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
            ))}
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-action-orange scale-125 shadow-lg' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
