import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, MessageCircle, RefreshCw, AlertTriangle } from 'lucide-react';
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
  const [connectionStatus, setConnectionStatus] = useState('connected'); // 'connected', 'disconnected', 'reconnecting'
  const [retryCount, setRetryCount] = useState(0);
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
    try {
      const context = analyzeUserContext(messageHistory);
      const newSuggestions = generateContextualSuggestions(context, currentLanguage);
      console.log('Generated suggestions:', newSuggestions);
      setContextualSuggestions(newSuggestions || []);
    } catch (error) {
      console.error('Error generating contextual suggestions:', error);
      setContextualSuggestions([]);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const callRituAPI = async (userMessage, conversationHistory, attempt = 1) => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second

    try {
      setConnectionStatus('connected');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch('/functions/v1/ritu-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          language: currentLanguage
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'API call failed');
      }

      setRetryCount(0); // Reset retry count on success
      return data.response;

    } catch (error) {
      console.error(`Ritu API error (attempt ${attempt}):`, error);
      
      if (attempt < maxRetries) {
        setConnectionStatus('reconnecting');
        const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
        await sleep(delay);
        setRetryCount(attempt);
        return callRituAPI(userMessage, conversationHistory, attempt + 1);
      } else {
        setConnectionStatus('disconnected');
        setRetryCount(maxRetries);
        return getEnhancedFallbackResponse(userMessage, currentLanguage, error);
      }
    }
  };

  const getEnhancedFallbackResponse = (userMessage, language, error) => {
    const isNetworkError = error.name === 'AbortError' || error.message.includes('fetch');
    const isServerError = error.message.includes('500') || error.message.includes('502') || error.message.includes('503');

    const fallbackResponses = {
      en: {
        network: "I'm having trouble connecting to my knowledge base right now due to a network issue. While I work on reconnecting, here's what I can help you with:\n\nFor immediate assistance, visit the official Department of Home Affairs website at homeaffairs.gov.au for the most current immigration information.\n\nCommon questions I can help with once reconnected:\n• Visa eligibility requirements\n• Points calculation for skilled migration\n• Processing times and costs\n• Document requirements\n\nPlease try asking your question again in a moment, or click the retry button below.",
        
        server: "I'm currently updating my systems with the latest immigration policies and will be back shortly. In the meantime:\n\n• Visit homeaffairs.gov.au for official immigration information\n• Check SkillSelect for invitation rounds\n• Review the skilled occupation lists\n• Prepare your documents while waiting\n\nI should be back online within a few minutes. Thank you for your patience!",
        
        default: "I'm experiencing temporary difficulties but I'm still here to help! While my advanced features are updating, here are some quick immigration resources:\n\n🇦🇺 Official website: homeaffairs.gov.au\n📊 Points calculator: Use the official Department calculator\n📋 Skilled occupation lists: Available on the Department website\n⏰ Processing times: Check current estimates online\n\nTry asking your question again - I should be back to full capacity shortly!"
      },
      hi: {
        network: "मैं अभी अपने ज्ञान आधार से जुड़ने में नेटवर्क समस्या का सामना कर रही हूँ। जबकि मैं पुनः कनेक्ट होने पर काम कर रही हूँ, यहाँ कुछ सहायता है:\n\nत्वरित सहायता के लिए, होम अफेयर्स की आधिकारिक वेबसाइट homeaffairs.gov.au पर जाएं।\n\nसामान्य प्रश्न जिनमें मैं मदद कर सकती हूँ:\n• वीज़ा पात्रता आवश्यकताएं\n• कुशल प्रवासन के लिए अंक गणना\n• प्रसंस्करण समय और लागत\n\nकृपया कुछ देर बाद अपना प्रश्न फिर से पूछें।",
        
        server: "मैं वर्तमान में नवीनतम इमिग्रेशन नीतियों के साथ अपने सिस्टम को अपडेट कर रही हूँ। इस बीच:\n\n• homeaffairs.gov.au पर आधिकारिक जानकारी देखें\n• SkillSelect पर निमंत्रण राउंड की जांच करें\n• कुशल व्यवसाय सूची की समीक्षा करें\n\nमैं कुछ मिनटों में वापस ऑनलाइन होऊंगी।",
        
        default: "मैं अस्थायी कठिनाइयों का सामना कर रही हूँ लेकिन फिर भी यहाँ मदद के लिए हूँ! जबकि मेरी उन्नत सुविधाएं अपडेट हो रही हैं:\n\n🇦🇺 आधिकारिक वेबसाइट: homeaffairs.gov.au\n📊 अंक कैलकुलेटर: विभाग का आधिकारिक कैलकुलेटर उपयोग करें\n\nकृपया अपना प्रश्न फिर से पूछें - मैं जल्द ही पूर्ण क्षमता में वापस आऊंगी!"
      }
    };

    const responses = fallbackResponses[language] || fallbackResponses.en;
    
    if (isNetworkError) {
      return responses.network;
    } else if (isServerError) {
      return responses.server;
    } else {
      return responses.default;
    }
  };

  const handleRetry = async () => {
    if (messages.length > 1) {
      const lastUserMessage = [...messages].reverse().find(msg => msg.type === 'user');
      if (lastUserMessage) {
        setRetryCount(0);
        setConnectionStatus('reconnecting');
        await handleSendMessage(lastUserMessage.message);
      }
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
        message: getEnhancedFallbackResponse(messageToSend, currentLanguage, error),
        timestamp: new Date(),
        showSuggestions: true,
        hasError: true
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
                  <div className="flex flex-col max-w-[85%]">
                    <AgentResponse message={message.message} />
                    {message.hasError && connectionStatus === 'disconnected' && (
                      <div className="mt-2 ml-14">
                        <Button
                          onClick={handleRetry}
                          variant="outline"
                          size="sm"
                          className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                        >
                          <RefreshCw className="w-3 h-3 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {currentLanguage === 'hi' ? 'आपके लिए सुझाव:' : 'Personalized suggestions for you:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contextualSuggestions
                      .filter(suggestion => suggestion && suggestion.icon && suggestion.text && suggestion.color)
                      .map((suggestion, index) => {
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
                    <span>
                      {connectionStatus === 'reconnecting' 
                        ? `Reconnecting... (attempt ${retryCount + 1})`
                        : "Analyzing your query with AI..."
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 border-t-2 border-gray-200 p-4 bg-white sticky bottom-0 z-10">
          {/* Connection status indicator */}
          {connectionStatus !== 'connected' && (
            <div className="mb-3 p-2 rounded-lg flex items-center gap-2 text-sm">
              {connectionStatus === 'disconnected' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center gap-2 w-full">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Connection lost - Using offline mode</span>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-2 rounded-lg flex items-center gap-2 w-full">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reconnecting to AI services...</span>
                </div>
              )}
            </div>
          )}
          
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
          {connectionStatus !== 'connected' && (
            <div className="ml-auto flex items-center gap-1">
              {connectionStatus === 'disconnected' ? (
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-blue-200" />
              )}
            </div>
          )}
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
                  <div className="flex flex-col max-w-[85%]">
                    <AgentResponse message={message.message} />
                    {message.hasError && connectionStatus === 'disconnected' && (
                      <div className="mt-2 ml-14">
                        <Button
                          onClick={handleRetry}
                          variant="outline"
                          size="sm"
                          className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                        >
                          <RefreshCw className="w-3 h-3 mr-2" />
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {message.type === 'agent' && message.showSuggestions && showSuggestions && contextualSuggestions.length > 0 && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">
                    {currentLanguage === 'hi' ? 'आपके लिए सुझाव:' : 'Personalized suggestions for you:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {contextualSuggestions
                      .filter(suggestion => suggestion && suggestion.icon && suggestion.text && suggestion.color)
                      .map((suggestion, index) => {
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
                    <span>
                      {connectionStatus === 'reconnecting' 
                        ? `Reconnecting... (attempt ${retryCount + 1})`
                        : "Analyzing your query with AI..."
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 border-t-2 border-gray-200 p-4 bg-white">
          {/* Connection status indicator */}
          {connectionStatus !== 'connected' && (
            <div className="mb-3 p-2 rounded-lg flex items-center gap-2 text-sm">
              {connectionStatus === 'disconnected' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg flex items-center gap-2 w-full">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Connection lost - Using offline mode</span>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 text-orange-700 px-3 py-2 rounded-lg flex items-center gap-2 w-full">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reconnecting to AI services...</span>
                </div>
              )}
            </div>
          )}
          
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
