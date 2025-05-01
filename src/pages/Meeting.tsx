
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoInterface from '@/components/VideoInterface';
import ChatBox from '@/components/ChatBox';
import Disclaimer from '@/components/Disclaimer';

const Meeting = () => {
  const [messages, setMessages] = useState([]);
  
  // Simulated AI responses for demonstration
  const aiResponses = {
    "visa": "There are several visa options for Australia depending on your purpose of visit. The main categories include skilled migration visas, family and partner visas, student visas, work visas, business/investor visas, and visitor visas. Each visa type has specific eligibility criteria and requirements. Could you tell me more about your situation so I can provide more relevant information?",
    
    "skilled": "For skilled migration, Australia offers several pathways like the Skilled Independent visa (subclass 189), Skilled Nominated visa (subclass 190), and Skilled Work Regional visa (subclass 491). These visas typically require a skills assessment, meeting points-based criteria (minimum 65 points), being under 45 years old, having competent English, and nominating an occupation on the skilled occupation list. The points system considers age, English language ability, work experience, education, and other factors.",
    
    "student": "Student visas (subclass 500) allow you to study full-time in Australia. You'll need to be accepted into a course registered on CRICOS, meet English language requirements (usually IELTS 5.5 or equivalent), have sufficient funds for tuition and living expenses, and meet health and character requirements. You can generally work up to 48 hours per fortnight while your course is in session, with unlimited work hours during scheduled course breaks.",
    
    "partner": "Partner visas allow Australian citizens, permanent residents or eligible New Zealand citizens to sponsor their spouse or de facto partner to live in Australia. This typically involves a two-stage process: a temporary visa followed by permanent residency. You'll need to provide evidence of a genuine and continuing relationship, including financial aspects, household matters, social context, and commitment to each other.",
    
    "points": "The points test for skilled migration requires a minimum score of 65 points. Points are awarded for: age (maximum 30 points), English language proficiency (maximum 20 points), skilled employment experience (maximum 20 points), educational qualifications (maximum 20 points), and other factors such as study in Australia, community language skills, or having a skilled spouse. The Department of Home Affairs website has a points calculator you can use to estimate your score.",
    
    "cost": "Visa application fees vary widely depending on the visa type. For example, a Skilled Independent visa (189) currently costs AUD 4,640, a Partner visa application costs around AUD 8,515, and a Student visa is AUD 710. Most visa applications also require health examinations and police clearances which involve additional fees. These amounts are subject to change, so it's always best to check the current fees on the Department of Home Affairs website.",
    
    "time": "Processing times vary significantly depending on the visa type and individual circumstances. As a general guide: Visitor visas may take from a few days to several weeks; Student visas typically take 4-6 weeks; Skilled migration visas can take 6-18 months; Partner visas currently have longer processing times, often 18-24 months or more. These timeframes can change based on application volumes and department priorities.",
    
    "work": "Working rights depend on your visa type. Temporary Skill Shortage visas (subclass 482) allow full-time work with a sponsoring employer. Working Holiday visas allow full-time work with limitations on duration with each employer. Student visas allow work for up to 48 hours per fortnight during term time. Permanent residency visas provide unrestricted work rights. Each visa has specific conditions, so it's important to understand the limitations of your particular visa."
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
      let aiResponseText = "I'm here to help with your Australian visa and migration questions. Could you please provide more details about your specific inquiry?";
      
      // Simple keyword matching for demonstration
      const messageLower = message.toLowerCase();
      
      Object.keys(aiResponses).forEach(keyword => {
        if (messageLower.includes(keyword)) {
          aiResponseText = aiResponses[keyword];
        }
      });
      
      // If message contains a question about eligibility
      if (messageLower.includes("eligible") || messageLower.includes("qualify") || messageLower.includes("can i")) {
        aiResponseText = "Eligibility for Australian visas depends on many factors specific to your situation. To provide accurate guidance, I'd need to know more details like your age, occupation, qualifications, English proficiency level, and the specific visa you're interested in. However, I must emphasize that I can only provide general information based on publicly available resources, not a personalized eligibility assessment, which should be done by a registered migration agent.";
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
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Meeting with Gulshan</h1>
        <p className="text-gray-600 mb-6">
          Ask questions about Australian visa options, requirements, and processes.
        </p>
        
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
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-3">Important Information</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-australia-blue mr-2">•</span>
              All information provided is based on publicly available resources and should not be considered legal advice.
            </li>
            <li className="flex items-start">
              <span className="text-australia-blue mr-2">•</span>
              For official information, please visit the <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" className="text-australia-blue hover:underline">Department of Home Affairs website</a>.
            </li>
            <li className="flex items-start">
              <span className="text-australia-blue mr-2">•</span>
              For personalized advice, please consult with a registered migration agent or immigration lawyer.
            </li>
            <li className="flex items-start">
              <span className="text-australia-blue mr-2">•</span>
              Visa requirements and processes may change over time. Always verify information from official sources.
            </li>
          </ul>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Meeting;
