
import React from 'react';
import { Loader2 } from 'lucide-react';

const ChatLoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[85%]">
        <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
          R
        </div>
        <div className="bg-white border-2 border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing your message...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoadingIndicator;
