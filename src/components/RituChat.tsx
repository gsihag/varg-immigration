
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, FileText, Calculator, MapPin, Users, BookOpen } from 'lucide-react';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const RituChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: "Hello! I'm Ritu, your AI immigration assistant for Australia. I'm here to help you navigate your journey to Australia with personalized guidance, visa assessments, and step-by-step support. What would you like to know about Australian immigration?",
      timestamp: new Date(),
      suggestions: [
        "Check my visa eligibility",
        "Explain skilled migration points",
        "Document checklist for my visa",
        "Latest processing times",
        "State nomination requirements"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced RAG-style knowledge base
  const knowledgeBase = {
    visaTypes: {
      "skilled": {
        subclass189: "Skilled Independent visa (subclass 189) - for skilled workers who are not sponsored by an employer, state, or family member. Requires 65+ points and occupation on skilled occupation list.",
        subclass190: "Skilled Nominated visa (subclass 190) - for skilled workers nominated by an Australian state or territory. Requires state nomination and adds 5 points to your score.",
        subclass491: "Skilled Work Regional visa (subclass 491) - for skilled workers who want to live and work in regional Australia. Valid for 5 years with pathway to permanent residency."
      },
      partner: "Partner visas allow the spouse or de facto partner of an Australian citizen, permanent resident, or eligible New Zealand citizen to live in Australia. Two-stage process: temporary (820/309) then permanent (801/100).",
      student: "Student visa (subclass 500) allows international students to study in Australia. Requires enrollment in CRICOS-registered course, adequate English, health insurance (OSHC), and sufficient funds.",
      work: "Work visas include Temporary Skill Shortage (482), Employer Nomination Scheme (186), and Regional Sponsored Migration Scheme (187). Require employer sponsorship and skills assessment."
    },
    pointsSystem: {
      age: "Maximum 30 points: 25-32 years (30 points), 33-39 years (25 points), 40-44 years (15 points)",
      english: "Maximum 20 points: Superior English (20 points), Proficient (10 points), Competent (0 points)",
      education: "Maximum 20 points: Doctorate (20 points), Bachelor/Masters (15 points), Diploma (10 points)",
      experience: "Maximum 20 points: 8+ years (15-20 points), 5-7 years (10-15 points), 3-4 years (5-10 points)",
      bonus: "Additional points: Australian study (5), Community language (5), Professional Year (5), State nomination (5-15), Partner skills (5-10)"
    },
    eligibility: {
      general: "Must be under 45 years, have competent English, positive skills assessment, and occupation on relevant skilled occupation list.",
      health: "Must meet health requirements through medical examinations by approved panel physicians.",
      character: "Must provide police clearances from all countries lived in for 12+ months since age 16."
    },
    processingTimes: {
      189: "6-18 months (75% processed within 8 months, 90% within 18 months)",
      190: "6-18 months (varies by state nomination processing)",
      500: "4-6 weeks for most student visa applications",
      820: "15-29 months for partner visa applications"
    }
  };

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    // Visa eligibility assessment
    if (message.includes('eligible') || message.includes('qualify') || message.includes('assessment')) {
      return {
        content: "I'd be happy to help assess your visa eligibility! To provide accurate guidance, I need to understand your profile better. Here are the key factors:\n\n🎯 **Age**: Must be under 45 for skilled visas\n📚 **Education**: Bachelor's degree or higher preferred\n💼 **Work Experience**: In your nominated occupation\n🗣️ **English**: IELTS 6.0+ (or equivalent)\n⭐ **Points**: Minimum 65 for skilled migration\n\nCould you tell me about your age, education, work experience, and English test scores? I'll provide a personalized assessment!",
        suggestions: [
          "I'm 28, engineer with 5 years experience",
          "Software developer, IELTS 7.5",
          "What occupations are in demand?",
          "Calculate my points score"
        ]
      };
    }

    // Points calculation
    if (message.includes('points') || message.includes('score') || message.includes('calculator')) {
      return {
        content: "🧮 **Australian Immigration Points Calculator**\n\nHere's how points are awarded:\n\n**Age (Max 30 points)**\n• 25-32 years: 30 points\n• 33-39 years: 25 points\n• 40-44 years: 15 points\n\n**English (Max 20 points)**\n• Superior (8.0+ IELTS): 20 points\n• Proficient (7.0+ IELTS): 10 points\n• Competent (6.0+ IELTS): 0 points\n\n**Education (Max 20 points)**\n• Doctorate: 20 points\n• Bachelor/Masters: 15 points\n• Diploma: 10 points\n\n**Experience (Max 20 points)**\n• 8+ years: 15-20 points\n• 5-7 years: 10-15 points\n• 3-4 years: 5-10 points\n\nMinimum 65 points needed, but 80-90+ points are competitive. Share your details for a personalized calculation!",
        suggestions: [
          "Calculate my exact points",
          "How to improve my score?",
          "State nomination points",
          "Professional Year benefits"
        ]
      };
    }

    // Visa types
    if (message.includes('visa type') || message.includes('which visa') || message.includes('best visa')) {
      return {
        content: "🛂 **Popular Australian Visa Pathways**\n\n**Skilled Migration**\n• Subclass 189 (Skilled Independent): No sponsorship needed\n• Subclass 190 (State Nominated): State sponsorship required\n• Subclass 491 (Regional): 5-year pathway to PR\n\n**Work Visas**\n• Subclass 482 (TSS): Employer sponsored, 2-4 years\n• Subclass 186 (ENS): Direct permanent residency\n\n**Other Pathways**\n• Partner visa: For spouses/de facto partners\n• Student visa: Study pathway to PR\n• Business/Investment visas\n\nTo recommend the best pathway, tell me about your situation: age, qualifications, work experience, and whether you have Australian connections?",
        suggestions: [
          "I want permanent residency quickly",
          "Employer sponsorship options",
          "Study then work pathway",
          "Partner visa requirements"
        ]
      };
    }

    // Documents
    if (message.includes('document') || message.includes('checklist') || message.includes('paperwork')) {
      return {
        content: "📋 **Essential Documents for Australian Visa**\n\n**Identity & Personal**\n• Passport (valid 6+ months)\n• Birth certificate\n• Marriage certificate (if applicable)\n• Police clearances from all countries\n\n**Education & Skills**\n• Educational transcripts & certificates\n• Skills assessment from relevant authority\n• English test results (IELTS/PTE/TOEFL)\n\n**Work Experience**\n• Employment references with duties\n• Payslips and employment contracts\n• Professional memberships/licenses\n\n**Financial**\n• Bank statements (3-6 months)\n• Evidence of funds for settlement\n\n**Health**\n• Medical examinations (when requested)\n• Health insurance (for some visas)\n\nNeed a personalized checklist? Tell me your visa type and I'll create a detailed list!",
        suggestions: [
          "Skills assessment requirements",
          "How to get police clearances?",
          "Document translation needs",
          "Medical examination process"
        ]
      };
    }

    // Processing times
    if (message.includes('processing time') || message.includes('how long') || message.includes('timeline')) {
      return {
        content: "⏱️ **Current Processing Times** (as of 2024)\n\n**Skilled Migration**\n• Subclass 189: 8-18 months\n• Subclass 190: 6-18 months (+ state processing)\n• Subclass 491: 6-12 months\n\n**Work Visas**\n• Subclass 482: 2-4 months\n• Subclass 186: 6-12 months\n\n**Other Visas**\n• Student visa: 4-6 weeks\n• Partner visa: 15-29 months\n• Visitor visa: 2-4 weeks\n\n**Tips for Faster Processing**\n✅ Complete application with all documents\n✅ Respond quickly to requests\n✅ Use registered migration agent\n✅ Health exams done early\n\nProcessing times vary based on application completeness and current workload. Which visa are you interested in?",
        suggestions: [
          "Why is my application taking long?",
          "Urgent processing options",
          "Check application status",
          "Bridging visa while waiting"
        ]
      };
    }

    // State nomination
    if (message.includes('state') || message.includes('nomination') || message.includes('190')) {
      return {
        content: "🗺️ **State Nomination Programs**\n\nEach Australian state offers nomination for skilled workers:\n\n**Popular States**\n• **Victoria**: Strong in IT, healthcare, engineering\n• **NSW**: Diverse opportunities, high competition\n• **Queensland**: Growing tech sector, regional options\n• **South Australia**: Lower competition, good for points\n• **Western Australia**: Mining, engineering focus\n• **Tasmania**: Easier nomination, beautiful lifestyle\n\n**Benefits**\n✅ 5 additional points\n✅ Priority processing\n✅ Pathway to permanent residency\n\n**Requirements**\n• Must commit to live/work in nominating state\n• Meet state-specific criteria\n• Occupation on state occupation list\n\nWhich state interests you most? I can provide specific requirements and current openings!",
        suggestions: [
          "Victoria nomination requirements",
          "NSW vs Queensland comparison",
          "Easiest states for nomination",
          "Regional vs metro nomination"
        ]
      };
    }

    // English requirements
    if (message.includes('english') || message.includes('ielts') || message.includes('pte')) {
      return {
        content: "🗣️ **English Language Requirements**\n\n**Accepted Tests**\n• IELTS Academic\n• PTE Academic\n• TOEFL iBT\n• Cambridge English\n• OET (for healthcare)\n\n**Skill Migration Levels**\n• **Competent**: IELTS 6.0 each band (minimum)\n• **Proficient**: IELTS 7.0 each band (+10 points)\n• **Superior**: IELTS 8.0 each band (+20 points)\n\n**Tips for Success**\n📚 Take preparation courses\n⏰ Book test early (high demand)\n🔄 Can retake if needed\n⚡ Results valid for 3 years\n\n**Score Comparison**\nIELTS 7.0 = PTE 65 = TOEFL 94-101\n\nNeed help improving your scores? I can suggest preparation strategies based on your current level!",
        suggestions: [
          "IELTS vs PTE - which is easier?",
          "Improve speaking score",
          "Free English test preparation",
          "English requirement exemptions"
        ]
      };
    }

    // General immigration info
    if (message.includes('australia') || message.includes('immigrat') || message.includes('move to australia')) {
      return {
        content: "🇦🇺 **Welcome to Your Australian Immigration Journey!**\n\nAustralia offers incredible opportunities for skilled migrants:\n\n**Why Choose Australia?**\n✨ World-class lifestyle and work-life balance\n🏥 Excellent healthcare and education systems\n💼 Strong job market and career opportunities\n🌏 Multicultural society with diverse communities\n🏖️ Beautiful cities and natural landscapes\n\n**Popular Immigration Pathways**\n1. **Skilled Migration** (65+ points required)\n2. **Employer Sponsorship** (job offer needed)\n3. **Study Pathway** (student visa → work rights)\n4. **Family/Partner Visa** (relationship-based)\n5. **Business/Investment** (significant capital)\n\n**Getting Started**\n📊 Skills assessment\n🎯 Points calculation\n📝 Document preparation\n🗂️ Application submission\n\nI'm here to guide you through every step! What's your background and immigration goal?",
        suggestions: [
          "Check my eligibility",
          "Compare visa options",
          "Cost of immigration",
          "Life in Australia"
        ]
      };
    }

    // Default response for complex or unmatched queries
    return {
      content: "I understand you're looking for guidance on Australian immigration. As your AI assistant, I'm here to help with:\n\n🔍 **Visa eligibility assessment**\n📊 **Points calculation**\n📋 **Document requirements**\n⏱️ **Processing timelines**\n🗺️ **State nomination guidance**\n🗣️ **English test requirements**\n💡 **Immigration strategies**\n\nCould you tell me more about your specific situation or what aspect of Australian immigration you'd like to explore? I'll provide detailed, personalized guidance!",
      suggestions: [
        "Assess my visa eligibility",
        "Calculate immigration points",
        "Document checklist",
        "Latest processing times"
      ]
    };
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = {
        id: nanoid(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-australia-blue to-australia-darkBlue p-4 rounded-t-lg">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Ritu</h3>
            <p className="text-sm text-blue-100">Your AI Immigration Assistant</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Online & Ready to Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'assistant' && (
                <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-8 h-8 flex items-center justify-center text-white flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-australia-blue text-white ml-auto' 
                  : 'bg-white border shadow-sm'
              }`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                
                {message.suggestions && message.type === 'assistant' && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">Quick actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-australia-blue/10 hover:bg-australia-blue/20 text-australia-blue px-3 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {message.type === 'user' && (
                <div className="bg-australia-blue rounded-full w-8 h-8 flex items-center justify-center text-white flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="bg-gradient-to-br from-australia-blue to-australia-darkBlue rounded-full w-8 h-8 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-australia-blue rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  <span className="text-sm text-gray-500 ml-2">Ritu is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Ritu about your Australian immigration journey..."
            className="flex-1 border-gray-300 focus:border-australia-blue focus:ring-australia-blue"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="bg-australia-blue hover:bg-australia-darkBlue px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Ritu provides general guidance. For complex cases, consider consulting a registered migration agent.
        </p>
      </div>
    </Card>
  );
};

export default RituChat;
