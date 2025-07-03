import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bot, Send, X, Minimize2, Maximize2, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useCRM } from '@/hooks/useCRM';
import { ReactMarkdown } from 'react-markdown';

interface Message {
  id: string;
  sender: 'user' | 'ritu';
  message: string;
  timestamp: string;
}

const FloatingChatWidget: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { useClientConversations } = useCRM();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const { data: conversations } = useClientConversations(user?.id || '');

  useEffect(() => {
    if (conversations && conversations.length > 0) {
      const formattedMessages = conversations.map(conv => ({
        id: conv.id,
        sender: conv.sender === 'client' ? 'user' : 'ritu' as 'user' | 'ritu',
        message: conv.message,
        timestamp: conv.timestamp || new Date().toISOString()
      }));
      setMessages(formattedMessages);
      setHasGreeted(true);
    } else if (!hasGreeted && isOpen) {
      // Send initial greeting when chat opens for the first time
      const welcomeMessage: Message = {
        id: 'welcome-' + Date.now(),
        sender: 'ritu',
        message: "G'day! 👋 I'm Ritu, your personal Australian immigration assistant from VARG Immigration! 🇦🇺\n\nIf you want guidance on visas, requirements, and everything in between - I've got you covered! \n\nLet's get started! 😊",
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      setHasGreeted(true);
    }
  }, [conversations, isOpen, hasGreeted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      // Save user message to database if user is logged in
      if (user?.id) {
        await supabase.from('ritu_conversations').insert({
          client_id: user.id,
          sender: 'client',
          message: newMessage,
          message_type: 'text'
        });
      }

      // Get AI response from Gemini
      const response = await supabase.functions.invoke('ritu-chat', {
        body: { 
          message: newMessage,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiReply = response.data?.reply || 'Sorry, I encountered an error. Please try again! 😅';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ritu',
        message: aiReply,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save AI response to database if user is logged in
      if (user?.id) {
        await supabase.from('ritu_conversations').insert({
          client_id: user.id,
          sender: 'ritu',
          message: aiReply,
          message_type: 'text'
        });
      }

    } catch (error: any) {
      console.error('Chat error:', error);
      
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ritu',
        message: "Oops! I'm having a bit of trouble connecting right now. 😅 But don't worry - I'm still here to help! Could you try asking your question again? In the meantime, feel free to explore our services or book a consultation with our human experts! 💪",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
      
      toast({
        title: "Connection Issue",
        description: "Having trouble connecting to Ritu. Please try again!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!showWidget) return null;

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="
              relative group
              h-16 px-4 rounded-full
              bg-gradient-to-r from-trust-blue to-confidence-purple
              hover:from-confidence-purple hover:to-trust-blue
              text-white font-semibold
              shadow-xl hover:shadow-2xl
              transition-all duration-300
              animate-pulse-glow
            "
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-green rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <span className="hidden sm:block text-sm font-medium">
                Chat with Ritu
              </span>
            </div>
            
            {/* Floating hearts animation */}
            <div className="absolute -top-2 -right-2">
              <Heart className="w-4 h-4 text-energy-pink animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-20 right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80' : 'w-96 h-[600px]'
        }`}>
          <Card className="h-full shadow-2xl border-2 border-trust-blue/20 bg-white">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-trust-blue to-confidence-purple text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarFallback className="bg-gradient-to-r from-action-orange to-action-warm text-white font-bold text-lg">
                      R
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Ritu - Your AI Assistant
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </CardTitle>
                    <p className="text-xs text-white/90 flex items-center gap-1">
                      <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
                      Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white hover:bg-white/20 p-1 h-8 w-8"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 p-1 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <>
                {/* Messages */}
                <CardContent className="flex-1 p-4 h-96 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-xl ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-trust-blue to-confidence-purple text-white'
                              : 'bg-white border border-border shadow-sm'
                          }`}
                        >
                          <ReactMarkdown className="text-sm whitespace-pre-wrap leading-relaxed">
                            {message.message}
                          </ReactMarkdown>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-border shadow-sm p-3 rounded-xl">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">Ritu is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about your Australian visa..."
                      className="flex-1 border-2 border-trust-blue/20 focus:border-trust-blue"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      className="bg-gradient-to-r from-trust-blue to-confidence-purple hover:from-confidence-purple hover:to-trust-blue"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Quick suggestions */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Visa options', 'Points calculator', 'Processing times'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setNewMessage(suggestion)}
                        className="text-xs px-2 py-1 bg-muted hover:bg-trust-blue rounded-full transition-colors"
                        disabled={isLoading}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;