
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentResponse from './AgentResponse';
import { Send } from 'lucide-react';

const ChatBox = ({ messages = [], onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    onSendMessage(messageInput);
    setMessageInput('');
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-xl border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-australia-blue to-australia-darkBlue p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
            R
          </div>
          <div>
            <h3 className="font-semibold text-lg">Ritu AI Assistant</h3>
            <p className="text-sm text-blue-100">Your Migration Expert</p>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-grow p-6 bg-gray-50">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isAgent ? 'justify-start' : 'justify-end'}`}
            >
              {msg.isAgent ? (
                <AgentResponse message={msg.message} />
              ) : (
                <div className="bg-australia-blue text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                  <p className="leading-relaxed">{msg.message}</p>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  R
                </div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="typing-indicator flex items-center gap-1">
                    <span className="w-2 h-2 bg-australia-blue rounded-full animate-pulse"></span>
                    <span className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-3">
          <Input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Ritu about your Australian migration..."
            className="flex-grow border-gray-300 focus:border-australia-blue focus:ring-australia-blue"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={messageInput.trim() === ''}
            className="bg-australia-blue hover:bg-australia-darkBlue px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Ritu AI provides general guidance. For personalized advice, book a consultation with our experts.
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
