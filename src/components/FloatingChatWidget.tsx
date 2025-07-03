import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bot, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useCRM } from '@/hooks/useCRM';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { useClientConversations } = useCRM();
  // We'll implement conversation creation separately for now

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const { data: conversations } = useClientConversations(user?.id || '');

  useEffect(() => {
    if (conversations) {
      const formattedMessages = conversations.map(conv => ({
        id: conv.id,
        sender: conv.sender === 'client' ? 'user' : 'ritu' as 'user' | 'ritu',
        message: conv.message,
        timestamp: conv.timestamp || new Date().toISOString()
      }));
      setMessages(formattedMessages);
    }
  }, [conversations]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWidget(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.id) return;

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
      // Save user message to database (simplified for now)
      await supabase.from('ritu_conversations').insert({
        client_id: user.id,
        sender: 'client',
        message: newMessage,
        message_type: 'text'
      });

      // Get AI response
      const response = await supabase.functions.invoke('ritu-chat', {
        body: { 
          message: newMessage,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const aiReply = response.data?.reply || 'Sorry, I encountered an error. Please try again.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ritu',
        message: aiReply,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save AI response to database (simplified for now)
      await supabase.from('ritu_conversations').insert({
        client_id: user.id,
        sender: 'ritu',
        message: aiReply,
        message_type: 'text'
      });

    } catch (error: any) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80' : 'w-96 h-[500px]'
        }`}>
          <Card className="h-full shadow-2xl border-2 border-trust-blue/20">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-trust-blue to-confidence-purple text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-white text-trust-blue font-bold text-sm">
                      R
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Ritu AI Assistant</CardTitle>
                    <p className="text-xs text-white/80">Your Immigration Expert</p>
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
                <CardContent className="flex-1 p-4 h-80 overflow-y-auto bg-gradient-to-b from-background to-muted/30">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center py-8">
                        <Bot className="w-12 h-12 text-trust-blue mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm">
                          G'day! I'm Ritu, your Australian immigration assistant. 
                          How can I help you today? 🇦🇺
                        </p>
                      </div>
                    )}
                    
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-xl ${
                            message.sender === 'user'
                              ? 'bg-trust-blue text-white'
                              : 'bg-white border border-border shadow-sm'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                          <p className={`text-xs mt-1 ${
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
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-trust-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
                      placeholder="Ask about your visa application..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      className="bg-trust-blue hover:bg-trust-blue/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
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