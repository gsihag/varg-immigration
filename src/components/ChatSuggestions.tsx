
import React from 'react';
import { Button } from '@/components/ui/button';

interface Suggestion {
  icon: any;
  text: string;
  color: string;
}

interface ChatSuggestionsProps {
  suggestions: Suggestion[];
  onSuggestionClick: (suggestionText: string) => void;
  currentLanguage: string;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ 
  suggestions, 
  onSuggestionClick, 
  currentLanguage 
}) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4 ml-14">
      <p className="text-sm text-gray-600 mb-3 font-medium">
        {currentLanguage === 'hi' ? 'आपके लिए सुझाव:' : 'Personalized suggestions for you:'}
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => {
          const IconComponent = suggestion.icon;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onSuggestionClick(suggestion.text)}
              className={`${suggestion.color} text-white border-none hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg text-xs px-3 py-2 h-auto`}
            >
              <IconComponent className="w-3 h-3 mr-2" />
              {suggestion.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSuggestions;
