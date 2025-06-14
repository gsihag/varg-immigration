
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoInterface from '@/components/VideoInterface';
import ChatBox from '@/components/ChatBox';
import Disclaimer from '@/components/Disclaimer';

const Meeting = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      isAgent: true,
      message: "Namaste! I'm Ritu, your AI immigration assistant from VARG Immigration. I'm here to help you with your Australian migration journey. As someone who understands the unique needs of Indian applicants, I can guide you through visa options, requirements, and processes. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  
  // Enhanced AI responses tailored for Indian diaspora
  const aiResponses = {
    "visa": "For Indian applicants, the most popular visa pathways to Australia include: 1) Skilled Independent visa (subclass 189) - for those with high points scores, 2) Skilled Nominated visa (subclass 190) - with state nomination, 3) Temporary Skill Shortage visa (subclass 482) - for sponsored work, 4) Partner visas for those married to Australian citizens/PRs, and 5) Student visas. Each has specific requirements. What's your professional background and purpose for migrating?",
    
    "skilled": "For skilled migration from India, you'll need: 1) Skills assessment from relevant authority (like ACS for IT, Engineers Australia for engineering), 2) IELTS/PTE English test (minimum 6 each for 189, but higher scores give more points), 3) Minimum 65 points (though competitive scores are 80-90+), 4) Age under 45, 5) Occupation on skilled occupation list. Popular Indian occupations include Software Engineer, Developer Programmer, Business Analyst, Accountant, and various engineering roles. What's your occupation?",
    
    "student": "Student visas (subclass 500) are popular among Indians. You need: 1) Acceptance into CRICOS-registered course, 2) English requirement (usually IELTS 5.5-6.5 depending on course), 3) Financial capacity (around AUD 21,000+ per year living costs plus tuition), 4) Health insurance (OSHC), 5) Genuine Temporary Entrant requirement. You can work 48 hours per fortnight during studies. Many Indians use this pathway to gain Australian qualifications and later apply for skilled migration.",
    
    "partner": "Partner visas have two stages: temporary (820/309) then permanent (801/100). You need to prove genuine relationship through: 1) Financial aspects (joint bank accounts, shared expenses), 2) Household matters (living together, shared responsibilities), 3) Social context (photos, joint social activities), 4) Commitment (future plans, knowledge about each other). Processing times are currently 15-29 months. Document everything well - this is crucial for Indian applicants.",
    
    "points": "Points test breakdown: Age (25 points for 25-32 years), English (20 points for Superior English), Employment (20 points for 8+ years skilled work), Education (20 points for Doctorate), plus bonus points for: Australian study (5), Community language like Hindi/Punjabi (5), Professional Year (5), State nomination (5-15), Partner skills (10). Most Indians need 80-90+ points to receive invitation. I can help calculate your points - share your details?",
    
    "english": "English requirements for Indians: IELTS Academic - Competent (6.0 each), Proficient (7.0 each), Superior (8.0 each). PTE Academic and TOEFL are also accepted. Many Indians find PTE easier. For skilled migration, higher English scores give more points and better invitation chances. Some visa types accept lower scores with conditions. Which English test are you planning to take?",
    
    "documents": "Common documents for Indian applicants: 1) Passport, birth certificate, 2) Educational transcripts from Indian universities (often need verification), 3) Work experience letters with detailed roles/responsibilities, 4) Skills assessment, 5) English test results, 6) Health examinations, 7) Police clearances from India and any other country lived in 12+ months, 8) Financial documents. Many documents need certified translations if not in English.",
    
    "cost": "Visa costs for Indians: Skilled Independent (189) - AUD 4,640, Student visa - AUD 710, Partner visa - AUD 8,515, plus health exams (AUD 300-500), police checks (varies), skills assessment (AUD 500-1000+), English tests (AUD 300-400). Don't forget living costs while waiting for visa processing. Always check current fees on Department of Home Affairs website.",
    
    "time": "Current processing times: Student visas - 4-6 weeks, Skilled migration - 6-18 months (varies by occupation and invitation rounds), Partner visas - 15-29 months, Work visas - 2-4 months. These change frequently. Indians should apply early and ensure all documents are ready. Processing can be faster with complete, accurate applications.",
    
    "state": "State nomination programs popular with Indians: NSW (especially Sydney), Victoria (Melbourne), Queensland (Brisbane), South Australia (Adelaide - offers extra points and lower cost of living). Each state has their own occupation lists and requirements. SA and Tasmania often have more opportunities for Indians with lower points. Which state interests you most?"
  };
  
  // Handle receiving new messages from the video interface
  const handleMessageReceived = (message) => {
    setMessages(prev => [...prev, message]);
  };
  
  // Handle sending messages from the chat box
  const handleSendMessage = (message) => {
    // Add user message to chat
    const userMessage = {
      id: nanoid(),
      isAgent: false,
      message: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response based on keywords in user message
    setTimeout(() => {
      // Generate an AI response based on message content
      let aiResponseText = "I understand you're looking for guidance on your Australian migration journey. As your AI assistant specializing in helping Indian applicants, I'm here to provide detailed information. Could you please share more about your specific situation - your profession, purpose of migration, or any particular visa type you're interested in?";
      
      // Simple keyword matching for demonstration
      const messageLower = message.toLowerCase();
      
      Object.keys(aiResponses).forEach(keyword => {
        if (messageLower.includes(keyword)) {
          aiResponseText = aiResponses[keyword];
        }
      });
      
      // Special responses for common Indian concerns
      if (messageLower.includes("indian") || messageLower.includes("india")) {
        aiResponseText = "As someone designed to help Indian applicants specifically, I understand the unique challenges you face - from document verification to skills assessment processes. Many of my responses are tailored for Indian qualifications and experience. What specific aspect of your migration from India would you like to discuss?";
      }
      
      if (messageLower.includes("eligible") || messageLower.includes("qualify") || messageLower.includes("can i")) {
        aiResponseText = "Eligibility depends on several factors specific to your profile. For Indian applicants, I typically assess: your age, English proficiency, work experience, education credentials, and chosen visa pathway. While I can provide general guidance based on publicly available information, remember that personalized eligibility assessment should be confirmed by our registered migration agents at VARG Immigration. Share your basic details and I can give you initial guidance!";
      }

      if (messageLower.includes("job") || messageLower.includes("work") || messageLower.includes("employment")) {
        aiResponseText = "For Indian professionals, popular occupations in Australia include IT roles (Software Engineers, Business Analysts), Engineering positions, Healthcare workers, Accountants, and Trades. Your Indian work experience counts towards points if it's in your nominated occupation. Many Indians also use employer sponsorship (482 visa) as a pathway. What's your professional background?";
      }
      
      // Add the AI response
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Meet Ritu - Your AI Immigration Assistant</h1>
          <p className="text-gray-600">
            Get instant, personalized guidance for your Australian migration journey. Ritu specializes in helping Indian diaspora navigate visa processes.
          </p>
        </div>
        
        <Disclaimer className="mb-6" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <VideoInterface onMessageReceived={handleMessageReceived} />
          </div>
          
          <div className="h-[500px]">
            <ChatBox 
              messages={messages} 
              onSendMessage={handleSendMessage} 
            />
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-australia-blue/5 to-australia-blue/10 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-3 text-australia-blue">Why Choose VARG Immigration?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">AI assistant trained specifically for Indian applicants</span>
              </li>
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">Registered migration agents for complex cases</span>
              </li>
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">Deep understanding of Indian qualifications & documents</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">5000+ successful Indian migration cases</span>
              </li>
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">24/7 AI support with human expert backup</span>
              </li>
              <li className="flex items-start">
                <span className="text-australia-blue mr-2">✓</span>
                <span className="text-sm">Specialized pathways for Indian professionals</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Meeting;
