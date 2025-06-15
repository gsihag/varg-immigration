import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Loader2, MessageCircle, Calculator, FileText, Clock, Users, MapPin } from 'lucide-react';
import AgentResponse from '@/components/AgentResponse';
import { useLanguage } from '@/components/LanguageSelector';

interface RituChatProps {
  isInPopup?: boolean;
}

const RituChat: React.FC<RituChatProps> = ({ isInPopup = false }) => {
  const { currentLanguage, t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
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

  // Auto-scroll on messages change and loading state change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Initialize with greeting based on language
    const initialGreeting = {
      id: 1,
      type: 'agent',
      message: t('greeting'),
      timestamp: new Date(),
      showSuggestions: true
    };
    setMessages([initialGreeting]);
  }, [currentLanguage, t]);

  const getSuggestions = (language) => {
    const suggestions = {
      en: [
        { icon: Calculator, text: "Calculate my points", color: "bg-green-500 hover:bg-green-600" },
        { icon: FileText, text: "Required documents", color: "bg-purple-500 hover:bg-purple-600" },
        { icon: Clock, text: "Processing times", color: "bg-blue-500 hover:bg-blue-600" },
        { icon: Users, text: "Family visa options", color: "bg-orange-500 hover:bg-orange-600" },
        { icon: MapPin, text: "State nomination", color: "bg-teal-500 hover:bg-teal-600" }
      ],
      hi: [
        { icon: Calculator, text: "मेरे पॉइंट्स की गणना करें", color: "bg-green-500 hover:bg-green-600" },
        { icon: FileText, text: "आवश्यक दस्तावेज़", color: "bg-purple-500 hover:bg-purple-600" },
        { icon: Clock, text: "प्रसंस्करण समय", color: "bg-blue-500 hover:bg-blue-600" },
        { icon: Users, text: "पारिवारिक वीज़ा विकल्प", color: "bg-orange-500 hover:bg-orange-600" },
        { icon: MapPin, text: "राज्य नामांकन", color: "bg-teal-500 hover:bg-teal-600" }
      ],
      zh: [
        { icon: Calculator, text: "计算我的积分", color: "bg-green-500 hover:bg-green-600" },
        { icon: FileText, text: "所需文件", color: "bg-purple-500 hover:bg-purple-600" },
        { icon: Clock, text: "处理时间", color: "bg-blue-500 hover:bg-blue-600" },
        { icon: Users, text: "家庭签证选项", color: "bg-orange-500 hover:bg-orange-600" },
        { icon: MapPin, text: "州担保", color: "bg-teal-500 hover:bg-teal-600" }
      ]
    };
    return suggestions[language] || suggestions.en;
  };

  const getAIResponse = (userMessage, language) => {
    const responses = {
      en: {
        'hello': "Hello! I'm here to help with your Australian immigration journey. What would you like to know?",
        'visa': "Australia offers various visa types including Skilled Independent (189), Skilled Nominated (190), Temporary Skill Shortage (482), and Partner visas. Which category interests you?",
        'points': "The points test evaluates factors like age, English proficiency, education, work experience, and Australian study. I can help calculate your points score.",
        'documents': "Common documents include passport, education transcripts, English test results, work references, and health/character certificates. What visa type are you considering?",
        'processing': "Processing times vary by visa type: 189 (8-12 months), 190 (8-15 months), 482 (3-5 months). Current times may differ based on your country and circumstances.",
        'family': "Family visas include Partner visas (820/801), Parent visas (103/143), and Child visas (101/102). Each has specific requirements and processing times.",
        'state': "State nomination programs like 190 and 491 visas offer additional pathways. Popular states include NSW, Victoria, Queensland, and South Australia with varying occupation lists.",
        'default': "I understand you're asking about Australian immigration. Let me help you with that. Can you be more specific about what aspect you'd like to know about - visa types, points calculation, documents, or processing times?"
      },
      hi: {
        'hello': "नमस्ते! मैं आपकी ऑस्ट्रेलियाई इमिग्रेशन यात्रा में सहायता के लिए यहाँ हूँ। आप क्या जानना चाहते हैं?",
        'visa': "ऑस्ट्रेलिया विभिन्न वीज़ा प्रकार प्रदान करता है जैसे कुशल स्वतंत्र (189), कुशल नामांकित (190), अस्थायी कौशल कमी (482), और पार्टनर वीज़ा। कौन सी श्रेणी आपकी रुचि है?",
        'points': "पॉइंट्स टेस्ट उम्र, अंग्रेजी प्रवाहता, शिक्षा, कार्य अनुभव, और ऑस्ट्रेलियाई अध्ययन जैसे कारकों का मूल्यांकन करता है। मैं आपके पॉइंट्स स्कोर की गणना में मदद कर सकती हूँ।",
        'documents': "सामान्य दस्तावेजों में पासपोर्ट, शिक्षा प्रमाण पत्र, अंग्रेजी टेस्ट परिणाम, कार्य संदर्भ, और स्वास्थ्य/चरित्र प्रमाण पत्र शामिल हैं। आप किस वीज़ा प्रकार पर विचार कर रहे हैं?",
        'processing': "प्रसंस्करण समय वीज़ा प्रकार के अनुसार भिन्न होता है: 189 (8-12 महीने), 190 (8-15 महीने), 482 (3-5 महीने)। वर्तमान समय आपके देश और परिस्थितियों के आधार पर भिन्न हो सकता है।",
        'family': "पारिवारिक वीज़ा में पार्टनर वीज़ा (820/801), माता-पिता वीज़ा (103/143), और बच्चे वीज़ा (101/102) शामिल हैं। प्रत्येक की विशिष्ट आवश्यकताएं और प्रसंस्करण समय हैं।",
        'state': "राज्य नामांकन कार्यक्रम जैसे 190 और 491 वीज़ा अतिरिक्त मार्ग प्रदान करते हैं। लोकप्रिय राज्यों में NSW, विक्टोरिया, क्वींसलैंड, और दक्षिण ऑस्ट्रेलिया शामिल हैं।",
        'default': "मैं समझती हूँ कि आप ऑस्ट्रेलियाई इमिग्रेशन के बारे में पूछ रहे हैं। मैं इसमें आपकी मदद करती हूँ। क्या आप अधिक विशिष्ट बता सकते हैं कि आप किस पहलू के बारे में जानना चाहते हैं - वीज़ा प्रकार, पॉइंट्स गणना, दस्तावेज़, या प्रसंस्करण समय?"
      },
      zh: {
        'hello': "您好！我在这里帮助您的澳洲移民之旅。您想了解什么？",
        'visa': "澳洲提供各种签证类型，包括技术独立移民(189)、技术提名移民(190)、临时技术短缺签证(482)和配偶签证。您对哪个类别感兴趣？",
        'points': "积分测试评估年龄、英语水平、教育、工作经验和澳洲学习等因素。我可以帮助计算您的积分。",
        'documents': "常见文件包括护照、教育成绩单、英语考试成绩、工作推荐信和健康/品格证明。您考虑申请哪种签证类型？",
        'processing': "处理时间因签证类型而异：189（8-12个月）、190（8-15个月）、482（3-5个月）。当前时间可能因您的国家和情况而有所不同。",
        'family': "家庭签证包括配偶签证(820/801)、父母签证(103/143)和子女签证(101/102)。每种都有特定要求和处理时间。",
        'state': "州担保项目如190和491签证提供额外途径。热门州包括新南威尔士、维多利亚、昆士兰和南澳，各有不同职业清单。",
        'default': "我理解您询问澳洲移民事宜。让我来帮助您。您能更具体地说明想了解哪个方面吗 - 签证类型、积分计算、文件要求还是处理时间？"
      }
    };

    const langResponses = responses[language] || responses.en;
    
    // Simple keyword matching for demo purposes
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('नमस्ते') || lowerMessage.includes('你好')) {
      return langResponses.hello;
    } else if (lowerMessage.includes('visa') || lowerMessage.includes('वीज़ा') || lowerMessage.includes('签证')) {
      return langResponses.visa;
    } else if (lowerMessage.includes('point') || lowerMessage.includes('पॉइंट') || lowerMessage.includes('积分')) {
      return langResponses.points;
    } else if (lowerMessage.includes('document') || lowerMessage.includes('दस्तावेज') || lowerMessage.includes('文件')) {
      return langResponses.documents;
    } else if (lowerMessage.includes('processing') || lowerMessage.includes('time') || lowerMessage.includes('प्रसंस्करण') || lowerMessage.includes('处理')) {
      return langResponses.processing;
    } else if (lowerMessage.includes('family') || lowerMessage.includes('पारिवारिक') || lowerMessage.includes('家庭')) {
      return langResponses.family;
    } else if (lowerMessage.includes('state') || lowerMessage.includes('nomination') || lowerMessage.includes('राज्य') || lowerMessage.includes('州担保')) {
      return langResponses.state;
    } else {
      return langResponses.default;
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

    // Add user message and clear input immediately
    setMessages(prev => [...prev, userMessage]);
    if (!messageText) setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'agent',
        message: getAIResponse(messageToSend, currentLanguage),
        timestamp: new Date(),
        showSuggestions: true
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setShowSuggestions(true);
    }, 1000 + Math.random() * 2000);
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

  const suggestions = getSuggestions(currentLanguage);

  if (isInPopup) {
    return (
      <div className="h-full flex flex-col bg-gray-50">
        {/* Messages Container - Scrollable Area */}
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
              
              {/* Suggestions - Show after agent responses */}
              {message.type === 'agent' && message.showSuggestions && showSuggestions && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => {
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
                    <span>{t('loading')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to help with scrolling */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area - Sticky at Bottom */}
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
            Ask Ritu about Australian visas, points calculation, documents, and migration process
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
        {/* Messages Container - Fixed Height with Scroll */}
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
              
              {/* Suggestions - Show after agent responses */}
              {message.type === 'agent' && message.showSuggestions && showSuggestions && (
                <div className="mt-4 ml-14">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => {
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
                    <span>{t('loading')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible element to help with scrolling */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area - Fixed at Bottom with Enhanced Styling */}
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
            Ask Ritu about Australian visas, points calculation, documents, and migration process
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RituChat;
