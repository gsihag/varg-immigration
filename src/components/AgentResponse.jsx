
import React from 'react';

const AgentResponse = ({ message }) => {
  const highlightTerms = (text) => {
    const terms = [
      "Skilled Independent visa", "Partner visa", "Student visa", "subclass 189", "subclass 190", "subclass 482",
      "Temporary Skill Shortage visa", "Working Holiday visa", "Business visa", "subclass 500",
      "Department of Home Affairs", "points test", "skills assessment", "IELTS", "PTE", "TOEFL",
      "English requirement", "expression of interest", "EOI", "invitation to apply", "ITA",
      "bridging visa", "permanent residency", "PR", "visa condition", "sponsorship", "nomination",
      "CRICOS", "ACS", "Engineers Australia", "VARG Immigration", "Australian study", 
      "Community language", "Professional Year", "Australia", "migration", "visa"
    ];
    
    let highlightedText = text;
    
    // First handle the special case for "Ritu" name highlighting
    highlightedText = highlightedText.replace(
      /\bRitu\b/gi, 
      '<span class="text-australia-blue font-semibold">Ritu</span>'
    );
    
    // Then handle other terms
    terms.forEach(term => {
      const regex = new RegExp(`\\b(${term})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-australia-blue font-semibold">$1</span>');
    });
    
    return { __html: highlightedText };
  };
  
  return (
    <div className="flex gap-3 max-w-[85%]">
      <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg">
        R
      </div>
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div 
          className="text-gray-800 leading-relaxed text-base"
          dangerouslySetInnerHTML={highlightTerms(message)}
        />
      </div>
    </div>
  );
};

export default AgentResponse;
