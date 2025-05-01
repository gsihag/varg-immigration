
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentResponse from './AgentResponse';

const ChatBox = ({ messages = [], onSendMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // Send message to parent component
    onSendMessage(messageInput);
    setMessageInput('');
    
    // Simulate agent typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000); // Show typing indicator for 2 seconds
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
      <div className="p-3 border-b bg-australia-blue/5">
        <h3 className="font-medium text-australia-blue">Chat with Gulshan</h3>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.isAgent ? 'justify-start' : 'justify-end'}`}
            >
              {msg.isAgent ? (
                <AgentResponse message={msg.message} />
              ) : (
                <div className="bg-australia-blue text-white px-4 py-2 rounded-t-2xl rounded-bl-2xl max-w-[80%]">
                  {msg.message}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-t-2xl rounded-br-2xl max-w-[80%] flex items-center">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t flex gap-2">
        <Input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button 
          onClick={handleSendMessage}
          disabled={messageInput.trim() === ''}
          className="bg-australia-blue hover:bg-australia-darkBlue"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
