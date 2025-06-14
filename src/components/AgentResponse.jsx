
import React from 'react';

const AgentResponse = ({ message }) => {
  // Function to identify and highlight special terms
  const highlightTerms = (text) => {
    // List of terms to highlight (visa types, important terms, Indian-specific terms)
    const terms = [
      "Skilled Independent visa", "Partner visa", "Student visa", "subclass 189", "subclass 190", "subclass 482",
      "Temporary Skill Shortage visa", "Working Holiday visa", "Business visa", "subclass 500",
      "Department of Home Affairs", "points test", "skills assessment", "IELTS", "PTE", "TOEFL",
      "English requirement", "expression of interest", "EOI", "invitation to apply", "ITA",
      "bridging visa", "permanent residency", "PR", "visa condition", "sponsorship", "nomination",
      "Indian", "India", "Hindi", "Punjabi", "CRICOS", "ACS", "Engineers Australia",
      "VARG Immigration", "Ritu", "Australian study", "Community language", "Professional Year"
    ];
    
    let highlightedText = text;
    
    terms.forEach(term => {
      // Case insensitive replacement with highlighting
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-australia-blue font-medium">$1</span>');
    });
    
    return { __html: highlightedText };
  };
  
  return (
    <div className="flex gap-2 max-w-[80%]">
      <div className="bg-australia-blue rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm mt-1">
        R
      </div>
      <div className="bg-gray-100 px-4 py-2 rounded-t-2xl rounded-br-2xl">
        <div 
          className="text-gray-800"
          dangerouslySetInnerHTML={highlightTerms(message)}
        />
      </div>
    </div>
  );
};

export default AgentResponse;
