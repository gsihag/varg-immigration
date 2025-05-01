
import React from 'react';

const AgentResponse = ({ message }) => {
  // Function to identify and highlight special terms
  const highlightTerms = (text) => {
    // List of terms to highlight (visa types, important terms)
    const terms = [
      "Skilled Independent visa", "Partner visa", "Student visa",
      "Temporary Skill Shortage visa", "Working Holiday visa", "Tourist visa",
      "Business visa", "Department of Home Affairs", "points test",
      "IELTS", "PTE", "English requirement", "skills assessment",
      "expression of interest", "EOI", "invitation to apply", "ITA",
      "bridging visa", "permanent residency", "PR", "subclass", "visa condition",
      "sponsorship", "nomination"
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
        G
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
