
import React from 'react';
import { User } from 'lucide-react';
import AgentResponse from '@/components/AgentResponse';

interface ChatMessage {
  id: number;
  type: 'user' | 'agent';
  message: string;
  timestamp: Date;
  showSuggestions?: boolean;
}

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.type === 'user' ? (
        <div className="flex gap-3 max-w-[85%]">
          <div className="bg-australia-blue text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
            {message.message}
          </div>
          <div className="bg-australia-blue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
            <User className="w-5 h-5" />
          </div>
        </div>
      ) : (
        <AgentResponse message={message.message} />
      )}
    </div>
  );
};

export default ChatMessage;
