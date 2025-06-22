
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoInterface from '@/components/VideoInterface';
//import ChatBox from '@/components/ChatBox';
import Disclaimer from '@/components/Disclaimer';
import { Shield, Clock, Users, CheckCircle } from 'lucide-react';

const Meeting = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      isAgent: true,
      message: "Hello! I'm Ritu, your AI immigration assistant from VARG Immigration. I'm here to help you with your Australian migration journey. I can guide you through visa options, requirements, and processes with instant, accurate information. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  
  // Enhanced AI responses for Australian migration
  const aiResponses = {
    "visa": "Australia offers several visa pathways: 1) Skilled Independent visa (subclass 189) - for high-scoring professionals, 2) Skilled Nominated visa (subclass 190) - with state nomination, 3) Temporary Skill Shortage visa (subclass 482) - for sponsored work, 4) Partner visas for relationships, and 5) Student visas. Each has specific requirements. What's your background and migration purpose?",
    
    "skilled": "For skilled migration, you'll need: 1) Skills assessment from relevant authority, 2) English test results (IELTS/PTE), 3) Minimum 65 points (competitive scores are 80-90+), 4) Age under 45, 5) Occupation on skilled occupation list. Popular occupations include Software Engineer, Business Analyst, Accountant, and various engineering roles. What's your occupation?",
    
    "student": "Student visas (subclass 500) require: 1) Acceptance into CRICOS-registered course, 2) English requirement (usually IELTS 5.5-6.5), 3) Financial capacity (around AUD 21,000+ per year), 4) Health insurance (OSHC), 5) Genuine Temporary Entrant requirement. You can work 48 hours per fortnight during studies.",
    
    "partner": "Partner visas have two stages: temporary (820/309) then permanent (801/100). You need to prove genuine relationship through financial, household, social, and commitment aspects. Processing times are currently 15-29 months. Documentation is crucial.",
    
    "points": "Points test: Age (25 for 25-32 years), English (20 for Superior), Employment (20 for 8+ years), Education (20 for Doctorate), plus bonus points for Australian study (5), community language (5), Professional Year (5), state nomination (5-15), partner skills (10). Most successful applicants have 80-90+ points.",
    
    "english": "English requirements: IELTS Academic - Competent (6.0 each), Proficient (7.0 each), Superior (8.0 each). PTE Academic and TOEFL are also accepted. Higher English scores give more points and better invitation chances.",
    
    "cost": "Visa costs: Skilled Independent (189) - AUD 4,640, Student visa - AUD 710, Partner visa - AUD 8,515, plus health exams, police checks, skills assessments, and English tests. Always check current fees on Department of Home Affairs website.",
    
    "time": "Processing times: Student visas - 4-6 weeks, Skilled migration - 6-18 months, Partner visas - 15-29 months, Work visas - 2-4 months. Times vary and applications should be submitted early with complete documentation."
  };
  
  const handleMessageReceived = (message) => {
    setMessages(prev => [...prev, message]);
  };
  
  const handleSendMessage = (message) => {
    const userMessage = {
      id: nanoid(),
      isAgent: false,
      message: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      let aiResponseText = "I understand you're looking for guidance on your Australian migration journey. As your AI assistant, I'm here to provide detailed information about visa pathways, requirements, and processes. Could you please share more about your specific situation or the type of visa you're interested in?";
      
      const messageLower = message.toLowerCase();
      
      Object.keys(aiResponses).forEach(keyword => {
        if (messageLower.includes(keyword)) {
          aiResponseText = aiResponses[keyword];
        }
      });
      
      if (messageLower.includes("eligible") || messageLower.includes("qualify")) {
        aiResponseText = "Eligibility depends on several factors including your age, English proficiency, work experience, education, and chosen visa pathway. While I can provide general guidance, personalized eligibility assessment should be confirmed by our registered migration agents. Share your details and I can give you initial guidance!";
      }

      if (messageLower.includes("job") || messageLower.includes("work")) {
        aiResponseText = "Popular occupations in Australia include IT roles, Engineering positions, Healthcare workers, Accountants, and Trades. Your work experience counts towards points if it's in your nominated occupation. Many people also use employer sponsorship (482 visa) as a pathway. What's your professional background?";
      }
      
      const aiMessage = {
        id: nanoid(),
        isAgent: true,
        message: aiResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Meet Ritu - Your <span className="text-australia-blue">AI Immigration Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant, personalized guidance for your Australian migration journey. 
            Ritu combines advanced AI with expert knowledge to help you succeed.
          </p>
        </div>
        
        <Disclaimer className="mb-8" />
        
        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="order-2 lg:order-1">
            <VideoInterface onMessageReceived={handleMessageReceived} />
          </div>
          
          {/*
          <div className="order-1 lg:order-2 h-[600px]">
            <ChatBox 
              messages={messages} 
              onSendMessage={handleSendMessage} 
            />
          </div>*/}
        </div>
        
        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose VARG Immigration with Ritu?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-australia-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Powered Accuracy</h3>
              <p className="text-gray-600 text-sm">Advanced AI trained on Australian immigration law ensures accurate, up-to-date guidance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-australia-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">24/7 Availability</h3>
              <p className="text-gray-600 text-sm">Get instant answers anytime, anywhere with our AI assistant available around the clock</p>
            </div>
            
            <div className="text-center">
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-australia-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Human Backup</h3>
              <p className="text-gray-600 text-sm">Registered migration agents ready to handle complex cases when needed</p>
            </div>
            
            <div className="text-center">
              <div className="bg-australia-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-australia-blue" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Proven Success</h3>
              <p className="text-gray-600 text-sm">5000+ successful applications with 98% success rate</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Meeting;
