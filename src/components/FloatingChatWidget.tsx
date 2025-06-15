
import React, { useState, useEffect } from 'react';
import { MessageCircle, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatPopup from '@/components/ChatPopup';

const FloatingChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  // Show widget after initial delay to let user settle in
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleWidgetClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  if (!showWidget) return null;

  return (
    <>
      {/* Floating Widget */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isChatOpen ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}>
        <Button
          onClick={handleWidgetClick}
          className={`
            relative group
            h-16 px-4 rounded-full
            bg-gradient-to-r from-australia-blue to-australia-darkBlue
            hover:from-australia-darkBlue hover:to-australia-blue
            text-white font-semibold
            shadow-xl hover:shadow-2xl
            transition-all duration-300
            magnetic-hover
            ${!isChatOpen ? 'animate-attention-grab' : ''}
          `}
          style={{
            animation: !isChatOpen ? 'attention-grab 2s ease-in-out infinite, pulse-glow 3s ease-in-out infinite' : 'none'
          }}
        >
          {/* Pulse Glow Background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-australia-blue to-australia-darkBlue opacity-75 animate-ping"></div>
          
          {/* Widget Content */}
          <div className="relative flex items-center gap-2 z-10">
            <div className="relative">
              <Bot className="w-6 h-6" />
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="hidden sm:block text-sm font-medium">
              Chat with Ritu
            </span>
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </Button>

        {/* Mobile-specific smaller version */}
        <div className="sm:hidden">
          <Button
            onClick={handleWidgetClick}
            className={`
              relative group
              h-14 w-14 rounded-full
              bg-gradient-to-r from-australia-blue to-australia-darkBlue
              hover:from-australia-darkBlue hover:to-australia-blue
              text-white
              shadow-xl hover:shadow-2xl
              transition-all duration-300
              magnetic-hover
              ${!isChatOpen ? 'animate-attention-grab' : ''}
            `}
            style={{
              animation: !isChatOpen ? 'attention-grab 2s ease-in-out infinite, pulse-glow 3s ease-in-out infinite' : 'none'
            }}
          >
            {/* Pulse Glow Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-australia-blue to-australia-darkBlue opacity-75 animate-ping"></div>
            
            {/* Widget Content */}
            <div className="relative z-10">
              <Bot className="w-6 h-6" />
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Chat Popup */}
      <ChatPopup 
        isOpen={isChatOpen} 
        onClose={handleCloseChat} 
      />
    </>
  );
};

export default FloatingChatWidget;
