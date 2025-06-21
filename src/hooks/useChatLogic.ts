
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageSelector';
import { analyzeUserContext, generateContextualSuggestions } from '@/utils/contextualSuggestions';

interface ChatMessage {
  id: number;
  type: 'user' | 'agent';
  message: string;
  timestamp: Date;
  showSuggestions?: boolean;
}

export const useChatLogic = () => {
  const { currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [contextualSuggestions, setContextualSuggestions] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // N8N Webhook URL
  const WEBHOOK_URL = 'https://gsihag.app.n8n.cloud/webhook-test/3c70de15-b6f6-4b6e-a0fb-f36cbd70f837';

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

    const initialGreeting: ChatMessage = {
      id: 1,
      type: 'agent',
      message: enhancedGreeting,
      timestamp: new Date(),
      showSuggestions: true
    };
    setMessages([initialGreeting]);
    
    updateContextualSuggestions([]);
  }, [currentLanguage]);

  const updateContextualSuggestions = (messageHistory: ChatMessage[]) => {
    const context = analyzeUserContext(messageHistory);
    const newSuggestions = generateContextualSuggestions(context, currentLanguage);
    setContextualSuggestions(newSuggestions);
  };

  const sendToWebhook = async (userMessage: string, conversationHistory: ChatMessage[]) => {
    try {
      console.log('Sending message to webhook:', userMessage);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          language: currentLanguage,
          timestamp: new Date().toISOString()
        }),
      });

      console.log('Webhook response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Webhook call failed with status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw webhook response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed JSON response:', responseData);
        
        if (typeof responseData === 'string') {
          return responseData;
        } else if (responseData.response) {
          return responseData.response;
        } else if (responseData.message) {
          return responseData.message;
        } else if (responseData.output) {
          return responseData.output;
        } else {
          return responseText;
        }
      } catch (jsonError) {
        console.log('Response is not JSON, using as plain text:', responseText);
        return responseText;
      }
    } catch (error) {
      console.error('Webhook error:', error);
      return "I'm experiencing some technical difficulties. Please try again in a moment.";
    }
  };

  const handleSendMessage = async (messageText: string | null = null) => {
    const messageToSend = messageText || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: ChatMessage = {
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
      const aiResponseText = await sendToWebhook(messageToSend, conversationHistory);
      
      const aiResponse: ChatMessage = {
        id: Date.now() + 1,
        type: 'agent',
        message: aiResponseText,
        timestamp: new Date(),
        showSuggestions: true
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      
      updateContextualSuggestions(finalMessages);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: ChatMessage = {
        id: Date.now() + 1,
        type: 'agent',
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        showSuggestions: true
      };
      setMessages(prev => [...prev, errorResponse]);
      setShowSuggestions(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    showSuggestions,
    contextualSuggestions,
    messagesEndRef,
    chatContainerRef,
    handleSendMessage
  };
};
