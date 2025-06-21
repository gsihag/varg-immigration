
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/components/LanguageSelector';
import { useChatLogic } from '@/hooks/useChatLogic';
import ChatMessage from '@/components/ChatMessage';
import ChatSuggestions from '@/components/ChatSuggestions';
import ChatInput from '@/components/ChatInput';
import ChatLoadingIndicator from '@/components/ChatLoadingIndicator';

interface RituChatProps {
  isInPopup?: boolean;
}

const RituChat: React.FC<RituChatProps> = ({ isInPopup = false }) => {
  const { currentLanguage, t } = useLanguage();
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    showSuggestions,
    contextualSuggestions,
    messagesEndRef,
    chatContainerRef,
    handleSendMessage
  } = useChatLogic();

  const handleSuggestionClick = (suggestionText: string) => {
    handleSendMessage(suggestionText);
  };

  if (isInPopup) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-white"
        >
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <ChatSuggestions
                  suggestions={contextualSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
          ))}
          
          {isLoading && <ChatLoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
        
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={() => handleSendMessage()}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-2 border-gray-200">
      <CardHeader className="flex-shrink-0 border-b-2 border-gray-100 bg-gradient-to-r from-australia-blue to-australia-darkBlue">
        <CardTitle className="flex items-center gap-2 text-white">
          <Bot className="w-5 h-5" />
          {t('chatWithRitu')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 bg-gray-50">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 scroll-smooth bg-white"
          style={{ maxHeight: 'calc(600px - 140px)' }}
        >
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <ChatSuggestions
                  suggestions={contextualSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
          ))}
          
          {isLoading && <ChatLoadingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 border-t-2 border-gray-200 p-4 bg-white">
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSendMessage={() => handleSendMessage()}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default RituChat;
