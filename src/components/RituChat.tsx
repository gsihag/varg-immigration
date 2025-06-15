
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, MessageCircle } from 'lucide-react';
import AgentResponse from '@/components/AgentResponse';
import { useLanguage } from '@/components/LanguageSelector';
import { analyzeUserContext, generateContextualSuggestions } from '@/utils/contextualSuggestions';

interface RituChatProps {
  isInPopup?: boolean;
}

const RituChat: React.FC<RituChatProps> = ({ isInPopup = false }) => {
  const { currentLanguage, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [contextualSuggestions, setContextualSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    const enhancedGreeting = currentLanguage === 'hi' 
      ? "नमस्ते! मैं रितु हूँ, ऑस्ट्रेलिया की सबसे बुद्धिमान AI इमिग्रेशन एजेंट। मैं नवीनतम सरकारी डेटा और नीतियों का उपयोग करके व्यक्तिगत सलाह प्रदान करती हूँ। आज मैं आपकी ऑस्ट्रेलियाई प्रवासन यात्रा में कैसे सहायता कर सकती हूँ?"
      : "Hello! I'm Ritu, Australia's most intelligent AI immigration agent. I provide personalized advice using the latest government data and immigration policies. How can I assist you with your Australian migration journey today?";

    const initialGreeting = {
      id: 1,
      type: 'agent',
      message: enhancedGreeting,
      timestamp: new Date(),
      showSuggestions: true
    };
    setMessages([initialGreeting]);
    
    // Generate initial contextual suggestions
    updateContextualSuggestions([]);
  }, [currentLanguage]);

  const updateContextualSuggestions = (messageHistory) => {
    const context = analyzeUserContext(messageHistory);
    const newSuggestions = generateContextualSuggestions(context, currentLanguage);
    setContextualSuggestions(newSuggestions);
  };

  const callRituAPI = async (userMessage, conversationHistory) => {
    try {
      console.log('Calling Ritu API with message:', userMessage);
      
      const response = await fetch('https://ewmrovhtpewutepgimth.supabase.co/functions/v1/ritu-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bXJvdmh0cGV3dXRlcGdpbXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MTUwNDUsImV4cCI6MjA2NTQ5MTA0NX0.RdOeh-5AdITHS_TEJ6gCEJgbU5hSkzZ9JITolNzcJiY`
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          language: currentLanguage
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      
      if (!data.success) {
        throw new Error(data.error || 'API call failed');
      }

      return data.response;
    } catch (error) {
      console.error('Ritu API error:', error);
      return getFallbackResponse(userMessage, currentLanguage);
    }
  };

  const getFallbackResponse = (userMessage, language) => {
    const fallbackResponses = {
      en: {
        default: "I'm experiencing some technical difficulties connecting to my knowledge base right now. However, I can still help you with general immigration guidance. For the most current and detailed information, I recommend checking the Department of Home Affairs website (homeaffairs.gov.au) or consulting with a registered migration agent. What specific aspect of Australian immigration would you like to discuss?",
        points: "For the Australian points test, key factors include: Age (maximum 30 points for 25-32 years), English proficiency (up to 20 points for superior level), skilled employment experience (up to 20 points), and education qualifications (up to 20 points). The current pass mark is typically 65-70 points for most skilled visas. Would you like me to help calculate your estimated points?",
        visa: "Australia offers several visa pathways: Skilled Independent (189) - no sponsorship needed, Skilled Nominated (190) - requires state nomination, Temporary Skill Shortage (482) - employer sponsored, and various family/partner visas. Each has different requirements and processing times. What's your current situation - are you looking for work, study, or family reunion?"
      },
      hi: {
        default: "मैं अभी अपने ज्ञान आधार से जुड़ने में कुछ तकनीकी कठिनाइयों का सामना कर रही हूँ। हालांकि, मैं अभी भी सामान्य इमिग्रेशन मार्गदर्शन में आपकी सहायता कर सकती हूँ। सबसे वर्तमान और विस्तृत जानकारी के लिए, मैं गृह मामलों के विभाग की वेबसाइट (homeaffairs.gov.au) देखने या एक पंजीकृत प्रवासन एजेंट से सलाह लेने की सलाह देती हूँ।",
        points: "ऑस्ट्रेलियाई अंक परीक्षा के लिए मुख्य कारकों में शामिल हैं: उम्र (25-32 वर्ष के लिए अधिकतम 30 अंक), अंग्रेजी प्रवाहता (उच्च स्तर के लिए 20 अंक तक), और शिक्षा योग्यता। वर्तमान पास मार्क आमतौर पर अधिकांश कुशल वीज़ा के लिए 65-70 अंक है।",
        visa: "ऑस्ट्रेलिया कई वीज़ा मार्ग प्रदान करता है: कुशल स्वतंत्र (189), कुशल नामांकित (190), अस्थायी कौशल कमी (482), और विभिन्न पारिवारिक वीज़ा। प्रत्येक की अलग आवश्यकताएं और प्रसंस्करण समय हैं।"
      }
    };

    const responses = fallbackResponses[language] || fallbackResponses.en;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('point') || lowerMessage.includes('अंक') || lowerMessage.includes('calculate')) {
      return responses.points || responses.default;
    } else if (lowerMessage.includes('visa') || lowerMessage.includes('वीज़ा')) {
      return responses.visa || responses.default;
    } else {
      return responses.default;
    }
  };

  const handleSendMessage = async (messageText = null) => {
    const messageToSend = messageText || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageToSend,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!messageText) setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const conversationHistory = messages.slice(-10);
      const aiResponseText = await callRituAPI(messageToSend, conversationHistory);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'agent',
        message: aiResponseText,
        timestamp: new Date(),
        showSuggestions: true
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      
      // Update contextual suggestions based on conversation history
      updateContextualSuggestions(finalMessages);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'agent',
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or feel free to contact our human immigration experts for immediate assistance.",
        timestamp: new Date(),
        showSuggestions: true
      };
      setMessages(prev => [...prev, errorResponse]);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {currentLanguage === 'hi' ? 'आपके लिए सुझाव:' : 'Personalized suggestions for you:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contextualSuggestions.map((suggestion, index) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`${suggestion.color} text-white border-none hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg text-xs px-3 py-2 h-auto`}
                        >
                          <IconComponent className="w-3 h-3 mr-2" />
                          {suggestion.text}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  R
                </div>
                <div className="bg-white border-2 border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing your query with AI...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 border-t-2 border-gray-200 p-4 bg-white sticky bottom-0 z-10">
          <div className="flex gap-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('askQuestion')}
              className="flex-1 border-2 border-gray-300 focus:border-australia-blue focus:ring-2 focus:ring-australia-blue/20 bg-white text-gray-900 placeholder:text-gray-500 shadow-sm"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-australia-blue hover:bg-australia-darkBlue text-white border-2 border-australia-blue hover:border-australia-darkBlue transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center font-medium">
            Ritu provides AI-powered guidance. For official advice, consult a registered migration agent.
          </p>
        </div>
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
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {currentLanguage === 'hi' ? 'आपके लिए सुझाव:' : 'Personalized suggestions for you:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contextualSuggestions.map((suggestion, index) => {
                      const IconComponent = suggestion.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className={`${suggestion.color} text-white border-none hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg text-xs px-3 py-2 h-auto`}
                        >
                          <IconComponent className="w-3 h-3 mr-2" />
                          {suggestion.text}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  R
                </div>
                <div className="bg-white border-2 border-gray-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing your query with AI...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 border-t-2 border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('askQuestion')}
              className="flex-1 border-2 border-gray-300 focus:border-australia-blue focus:ring-2 focus:ring-australia-blue/20 bg-white text-gray-900 placeholder:text-gray-500 shadow-sm"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-australia-blue hover:bg-australia-darkBlue text-white border-2 border-australia-blue hover:border-australia-darkBlue transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center font-medium">
            Ritu provides AI-powered guidance. For official advice, consult a registered migration agent.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RituChat;
