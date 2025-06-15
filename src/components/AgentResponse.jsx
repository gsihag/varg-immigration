
import React from 'react';

const AgentResponse = ({ message }) => {
  const highlightTerms = (text) => {
    // First, ensure the text is completely clean of any formatting codes
    let cleanText = text
      // Remove any remaining markdown
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/^\s*[\*\-\+]\s/gm, '')
      .replace(/^\s*\d+\.\s/gm, '')
      // Remove HTML tags and CSS classes
      .replace(/<[^>]*>/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '')
      // Remove CSS styling codes
      .replace(/australia-blue/g, '')
      .replace(/font-semibold/g, '')
      .replace(/font-bold/g, '')
      .replace(/text-\w+-\d+/g, '')
      .replace(/bg-\w+-\d+/g, '')
      // Remove stray quotes
      .replace(/"\s*([^"]+)\s*"/g, '$1')
      // Clean up spaces
      .replace(/\s+/g, ' ')
      .trim();

    const terms = [
      // Visa types and subcasses
      "Skilled Independent visa", "Skilled Nominated visa", "Partner visa", "Student visa", 
      "subclass 189", "subclass 190", "subclass 491", "subclass 482", "subclass 500",
      "subclass 820", "subclass 801", "subclass 309", "subclass 100", "subclass 103", "subclass 143",
      "Temporary Skill Shortage visa", "Working Holiday visa", "Business visa",
      
      // Government departments and organizations
      "Department of Home Affairs", "Home Affairs", "homeaffairs.gov.au",
      "Engineers Australia", "Australian Computer Society", "ACS", "CPA Australia",
      "AHPRA", "TRA", "Trades Recognition Australia",
      
      // Assessment and testing
      "points test", "skills assessment", "IELTS", "PTE", "TOEFL", "English requirement",
      "expression of interest", "EOI", "invitation to apply", "ITA", "SkillSelect",
      
      // Visa conditions and status
      "bridging visa", "permanent residency", "PR", "visa condition", "sponsorship", "nomination",
      "state nomination", "regional nomination", "employer sponsorship",
      
      // Study and qualifications
      "CRICOS", "Australian study", "Community language", "Professional Year",
      "vocational education", "higher education", "qualification recognition",
      
      // Location and general terms
      "Australia", "migration", "visa", "immigration", "processing time",
      "character requirement", "health examination", "police certificate",
      "registered migration agent", "MARA", "Migration Agent",
      
      // Special highlighting for Ritu
      "Ritu", "VARG Immigration"
    ];
    
    let highlightedText = cleanText;
    
    // First handle the special case for "Ritu" name highlighting
    highlightedText = highlightedText.replace(
      /\bRitu\b/gi, 
      '<span class="text-australia-blue font-bold">Ritu</span>'
    );
    
    // Handle VARG Immigration
    highlightedText = highlightedText.replace(
      /\bVARG Immigration\b/gi,
      '<span class="text-australia-blue font-semibold">VARG Immigration</span>'
    );
    
    // Handle other important terms
    terms.forEach(term => {
      if (term !== 'Ritu' && term !== 'VARG Immigration') {
        const regex = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
        highlightedText = highlightedText.replace(regex, '<span class="text-australia-blue font-semibold">$1</span>');
      }
    });
    
    // Highlight website URLs
    highlightedText = highlightedText.replace(
      /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.gov\.au)/gi,
      '<span class="text-blue-600 underline font-medium">$1</span>'
    );
    
    // Highlight processing times
    highlightedText = highlightedText.replace(
      /(\d+[-–]\d+\s+months?)/gi,
      '<span class="text-orange-600 font-semibold bg-orange-50 px-1 rounded">$1</span>'
    );
    
    // Highlight point values
    highlightedText = highlightedText.replace(
      /(\d+\s+points?)/gi,
      '<span class="text-green-600 font-semibold bg-green-50 px-1 rounded">$1</span>'
    );

    // Convert line breaks to proper HTML line breaks for plain text formatting
    highlightedText = highlightedText.replace(/\n/g, '<br/>');
    
    return { __html: highlightedText };
  };
  
  // Enhanced sanitization to completely clean the message
  const sanitizeMessage = (text) => {
    return text
      // Remove all markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/^\s*[\*\-\+]\s/gm, '')
      .replace(/^\s*\d+\.\s/gm, '')
      // Remove HTML tags and CSS classes completely
      .replace(/<[^>]*>/g, '')
      .replace(/class="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '')
      // Remove any CSS styling codes that might appear
      .replace(/australia-blue/g, '')
      .replace(/font-semibold/g, '')
      .replace(/font-bold/g, '')
      .replace(/text-\w+-\d+/g, '')
      .replace(/bg-\w+-\d+/g, '')
      .replace(/hover:\w+-\w+-\d+/g, '')
      // Remove stray quotes around words
      .replace(/"\s*([^"]+)\s*"/g, '$1')
      // Clean up multiple spaces and normalize whitespace
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };
  
  const cleanMessage = sanitizeMessage(message);
  
  return (
    <div className="flex gap-3 max-w-[85%]">
      <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg">
        R
      </div>
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
        <div 
          className="text-gray-800 leading-relaxed text-base font-normal"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          dangerouslySetInnerHTML={highlightTerms(cleanMessage)}
        />
        <div className="mt-2 text-xs text-gray-500 border-t pt-2">
          💡 <em>AI-powered advice by Ritu • Always verify with official sources</em>
        </div>
      </div>
    </div>
  );
};

export default AgentResponse;
