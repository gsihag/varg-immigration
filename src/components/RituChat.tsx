
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
  // Session-only data - no persistent storage
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

  // Comprehensive Australian immigration knowledge base
  const knowledgeBase = {
    visaTypes: {
      "189": {
        name: "Skilled Independent visa (subclass 189)",
        description: "For skilled workers who are not sponsored by an employer, state, or family member",
        requirements: "65+ points, occupation on MLTSSL, positive skills assessment, competent English, under 45 years",
        processing: "8-18 months (75% in 8 months, 90% in 18 months)",
        cost: "AUD 4,640 (main applicant)",
        benefits: "Permanent residency, live and work anywhere in Australia, pathway to citizenship"
      },
      "190": {
        name: "Skilled Nominated visa (subclass 190)",
        description: "For skilled workers nominated by an Australian state or territory",
        requirements: "65+ points (including 5 nomination points), state nomination, occupation on state list",
        processing: "6-18 months (varies by state)",
        cost: "AUD 4,640 + state fees",
        benefits: "Permanent residency, must live in nominating state for 2 years initially"
      },
      "491": {
        name: "Skilled Work Regional visa (subclass 491)",
        description: "For skilled workers who want to live and work in regional Australia",
        requirements: "65+ points (including 15 nomination points), regional nomination or family sponsorship",
        processing: "6-12 months",
        cost: "AUD 4,640",
        benefits: "5-year visa, pathway to PR after 3 years via subclass 191"
      },
      "482": {
        name: "Temporary Skill Shortage visa (subclass 482)",
        description: "For skilled workers sponsored by an Australian employer",
        requirements: "Job offer, skills assessment, 2+ years relevant experience, competent English",
        processing: "2-4 months",
        cost: "AUD 1,455-2,900",
        benefits: "2-4 years work rights, pathway to permanent residency"
      },
      "186": {
        name: "Employer Nomination Scheme visa (subclass 186)",
        description: "Direct permanent residency through employer sponsorship",
        requirements: "Job offer, skills assessment, 3+ years experience, competent English, under 45",
        processing: "6-12 months",
        cost: "AUD 4,640",
        benefits: "Permanent residency, live and work anywhere in Australia"
      }
    },
    pointsSystem: {
      age: {
        "18-24": 25,
        "25-32": 30,
        "33-39": 25,
        "40-44": 15,
        "45+": 0
      },
      english: {
        "Superior (8.0+ IELTS)": 20,
        "Proficient (7.0+ IELTS)": 10,
        "Competent (6.0+ IELTS)": 0
      },
      education: {
        "Doctorate": 20,
        "Bachelor/Masters": 15,
        "Diploma/Trade": 10,
        "Certificate IV": 10
      },
      experience: {
        "8+ years": 15,
        "5-7 years": 10,
        "3-4 years": 5,
        "Less than 3": 0
      },
      bonusPoints: {
        "Australian study (2+ years)": 5,
        "Community language": 5,
        "Professional Year": 5,
        "State nomination": 5,
        "Regional nomination": 15,
        "Partner skills": 10,
        "Relative in regional area": 15
      }
    },
    occupationLists: {
      MLTSSL: "Medium and Long-term Strategic Skills List - for subclass 189, 190, 491",
      STSOL: "Short-term Skilled Occupation List - for subclass 482 short-term stream",
      ROL: "Regional Occupation List - for subclass 491 and regional areas"
    },
    stateNomination: {
      "Victoria": {
        requirements: "Strong in IT, healthcare, engineering. Requires job offer or high points",
        website: "liveinvictoria.vic.gov.au",
        processing: "6-8 weeks"
      },
      "NSW": {
        requirements: "Diverse opportunities, high competition. Stream 1 (resident) and Stream 2 (offshore)",
        website: "business.nsw.gov.au",
        processing: "12 weeks"
      },
      "Queensland": {
        requirements: "Growing tech sector, regional options available",
        website: "migration.qld.gov.au", 
        processing: "4-6 weeks"
      },
      "South Australia": {
        requirements: "Lower competition, good for lower points. Chain migration available",
        website: "migration.sa.gov.au",
        processing: "6-8 weeks"
      },
      "Western Australia": {
        requirements: "Mining, engineering focus. Graduate stream available",
        website: "migration.wa.gov.au",
        processing: "8-10 weeks"
      },
      "Tasmania": {
        requirements: "Easier nomination, beautiful lifestyle. Offshore and onshore streams",
        website: "migration.tas.gov.au",
        processing: "4-6 weeks"
      }
    },
    skillsAssessment: {
      "Engineers Australia": "For engineering occupations",
      "ACS": "Australian Computer Society - for ICT occupations",
      "CPA/CA ANZ/IPA": "For accounting occupations",
      "AACA": "For architecture occupations",
      "ANMAC": "For nursing occupations",
      "AHPRA": "For health professional occupations"
    },
    englishTests: {
      IELTS: {
        competent: "6.0 each band",
        proficient: "7.0 each band", 
        superior: "8.0 each band"
      },
      PTE: {
        competent: "50 each section",
        proficient: "65 each section",
        superior: "79 each section"
      },
      TOEFL: {
        competent: "L12/R13/W21/S18",
        proficient: "L24/R24/W27/S23",
        superior: "L28/R29/W30/S26"
      }
    },
    processingTimes: {
      current: {
        "189": "8-18 months (80% in 8 months, 90% in 18 months)",
        "190": "6-18 months (varies by state)",
        "491": "6-12 months",
        "482": "2-4 months",
        "186": "6-12 months",
        "500": "4-6 weeks",
        "820": "15-29 months"
      }
    },
    documentRequirements: {
      identity: ["Passport", "Birth certificate", "National ID"],
      education: ["Academic transcripts", "Degree certificates", "Skills assessment"],
      employment: ["Employment references", "Payslips", "Employment contracts", "Duty statements"],
      english: ["IELTS/PTE/TOEFL results"],
      character: ["Police clearances from all countries lived 12+ months"],
      health: ["Medical examinations from approved doctors"],
      financial: ["Bank statements", "Evidence of funds"]
    }
  };

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    // Enhanced visa eligibility assessment
    if (message.includes('eligible') || message.includes('qualify') || message.includes('assessment')) {
      return {
        content: "I'd be happy to help assess your visa eligibility! Let me guide you through the key requirements:\n\n🎯 **Key Eligibility Factors:**\n\n**Age Requirements:**\n• Must be under 45 for skilled visas (189, 190, 491)\n• Under 50 for employer-sponsored visas (482, 186)\n\n**English Requirements:**\n• Competent English minimum (IELTS 6.0 each band)\n• Higher scores give more points and better chances\n\n**Skills & Experience:**\n• Occupation must be on relevant skills list\n• Positive skills assessment required\n• Relevant work experience in nominated occupation\n\n**Points Score (for skilled visas):**\n• Minimum 65 points required\n• Competitive scores are 80-90+ points\n• Points awarded for age, English, education, experience\n\nTo provide a personalized assessment, could you share:\n1. Your age and occupation\n2. Education level and English test scores\n3. Years of relevant work experience\n4. Current location and visa status",
        suggestions: [
          "I'm 28, software engineer, 5 years experience",
          "Calculate my points score",
          "Compare visa options for my profile",
          "State nomination requirements"
        ]
      };
    }

    // Enhanced points calculation with detailed breakdown
    if (message.includes('points') || message.includes('score') || message.includes('calculator')) {
      return {
        content: "🧮 **Australian Immigration Points Calculator**\n\n**Age Points (Maximum 30):**\n• 25-32 years: 30 points ⭐\n• 33-39 years: 25 points\n• 40-44 years: 15 points\n• 45+ years: 0 points\n\n**English Points (Maximum 20):**\n• Superior (IELTS 8.0+): 20 points ⭐\n• Proficient (IELTS 7.0+): 10 points\n• Competent (IELTS 6.0+): 0 points\n\n**Education Points (Maximum 20):**\n• Doctorate (PhD): 20 points ⭐\n• Bachelor/Masters: 15 points\n• Diploma/Trade qualification: 10 points\n\n**Experience Points (Maximum 20):**\n• 8+ years relevant experience: 15-20 points ⭐\n• 5-7 years: 10-15 points\n• 3-4 years: 5-10 points\n\n**Bonus Points Available:**\n• State nomination: +5 points (190) or +15 points (491)\n• Australian study (2+ years): +5 points\n• Community language: +5 points\n• Professional Year: +5 points\n• Partner skills: +5-10 points\n\n**💡 Strategy Tips:**\n• 65 points = minimum eligible\n• 80+ points = competitive for invitations\n• 90+ points = very strong chance\n\nShare your details for a personalized calculation!",
        suggestions: [
          "Calculate my exact points",
          "How to improve my score?",
          "What's a competitive score?",
          "State nomination benefits"
        ]
      };
    }

    // Comprehensive visa types explanation
    if (message.includes('visa type') || message.includes('which visa') || message.includes('best visa')) {
      return {
        content: "🛂 **Australian Visa Pathways Guide**\n\n**🎯 SKILLED MIGRATION (Points-based)**\n\n**Subclass 189 - Skilled Independent**\n• No sponsorship required\n• Live anywhere in Australia\n• 65+ points needed, 80+ competitive\n• Processing: 8-18 months\n\n**Subclass 190 - State Nominated**\n• State government sponsorship\n• +5 bonus points\n• Must live in nominating state initially\n• Processing: 6-18 months\n\n**Subclass 491 - Regional Skilled**\n• Regional nomination (+15 points)\n• 5-year visa → pathway to PR\n• Live/work in regional areas\n• Processing: 6-12 months\n\n**💼 EMPLOYER SPONSORED**\n\n**Subclass 482 - Temporary Skill Shortage**\n• 2-4 year work visa\n• Employer sponsorship required\n• Pathway to permanent residency\n• Processing: 2-4 months\n\n**Subclass 186 - Direct Permanent**\n• Immediate permanent residency\n• Employer nomination required\n• 3+ years experience needed\n• Processing: 6-12 months\n\n**🎓 OTHER PATHWAYS**\n• Partner visas (820/801)\n• Student visa (500) → skilled migration\n• Business/investor visas\n\nTo recommend the best pathway, tell me about:\n• Your occupation and experience\n• Current age and English level\n• Whether you have job offers or family in Australia",
        suggestions: [
          "Compare 189 vs 190 visas",
          "Employer sponsorship process",
          "Regional migration benefits",
          "Study pathway to PR"
        ]
      };
    }

    // Enhanced document guidance
    if (message.includes('document') || message.includes('checklist') || message.includes('paperwork')) {
      return {
        content: "📋 **Complete Document Checklist for Australian Visas**\n\n**🆔 IDENTITY DOCUMENTS**\n• Current passport (valid 6+ months)\n• Birth certificate with apostille\n• Marriage certificate (if applicable)\n• Change of name documents (if applicable)\n\n**🎓 EDUCATION & SKILLS**\n• Academic transcripts (all institutions)\n• Degree/diploma certificates\n• Skills assessment from relevant authority\n• Professional licenses/memberships\n\n**🗣️ ENGLISH PROFICIENCY**\n• IELTS/PTE/TOEFL test results\n• Must be within 3 years of application\n• All band scores meeting requirements\n\n**💼 EMPLOYMENT EVIDENCE**\n• Employment references (detailed duties)\n• Payslips (recent 3-6 months)\n• Employment contracts\n• Tax returns/group certificates\n• Professional development certificates\n\n**👮 CHARACTER DOCUMENTS**\n• Police clearances from all countries\n• Military service records (if applicable)\n• Court documents (if any offenses)\n\n**🏥 HEALTH REQUIREMENTS**\n• Medical examinations (when requested)\n• Chest X-rays and blood tests\n• Additional tests for specific countries\n\n**💰 FINANCIAL EVIDENCE**\n• Bank statements (3-6 months)\n• Evidence of funds for settlement\n• Property valuations (if applicable)\n\n**📑 VISA-SPECIFIC DOCUMENTS**\n• Form 80 (Personal Particulars)\n• Form 1221 (Additional Information)\n• State nomination documents (if applicable)\n\nNeed a personalized checklist? Tell me your visa type and I'll create a tailored list!",
        suggestions: [
          "Skills assessment process",
          "Police clearance requirements",
          "Document translation needs",
          "Health examination details"
        ]
      };
    }

    // Enhanced processing times with current data
    if (message.includes('processing time') || message.includes('how long') || message.includes('timeline')) {
      return {
        content: "⏱️ **Current Processing Times (Updated 2024)**\n\n**🎯 SKILLED MIGRATION**\n• **Subclass 189:** 8-18 months\n  - 75% processed within 8 months\n  - 90% processed within 18 months\n  - High points (90+) may be faster\n\n• **Subclass 190:** 6-18 months\n  - Depends on state processing times\n  - Victoria/NSW: longer due to high demand\n  - SA/Tasmania: generally faster\n\n• **Subclass 491:** 6-12 months\n  - Regional areas process faster\n  - Complete applications prioritized\n\n**💼 WORK VISAS**\n• **Subclass 482:** 2-4 months\n  - Short-term stream: 2-3 months\n  - Medium-term stream: 3-4 months\n\n• **Subclass 186:** 6-12 months\n  - Direct entry stream: 6-8 months\n  - Labour agreement stream: 8-12 months\n\n**👨‍👩‍👧‍👦 OTHER VISAS**\n• **Student visa (500):** 4-6 weeks\n• **Partner visa (820/801):** 15-29 months\n• **Visitor visa (600):** 2-4 weeks\n\n**⚡ TIPS FOR FASTER PROCESSING**\n✅ Submit complete applications\n✅ Respond quickly to requests\n✅ Complete health exams early\n✅ Provide certified translations\n✅ Use registered migration agent\n\n**⚠️ DELAYS CAN OCCUR DUE TO:**\n• Incomplete applications\n• Character or health issues\n• High application volumes\n• Complex cases requiring further assessment\n\nWhich visa are you applying for? I can provide more specific timeline guidance!",
        suggestions: [
          "Why is my application delayed?",
          "Urgent processing options",
          "Check application status",
          "Bridging visa information"
        ]
      };
    }

    // Enhanced state nomination guidance
    if (message.includes('state') || message.includes('nomination') || message.includes('190')) {
      return {
        content: "🗺️ **Australian State Nomination Programs (Subclass 190)**\n\n**🏙️ MAJOR STATES**\n\n**Victoria (VIC)**\n• Strong in: IT, Healthcare, Engineering\n• Requirements: Job offer OR very high points\n• Streams: Skilled worker, International student\n• Processing: 6-8 weeks\n• Website: liveinvictoria.vic.gov.au\n\n**New South Wales (NSW)**\n• Most diverse opportunities\n• High competition, strict requirements\n• Stream 1: Current residents\n• Stream 2: Offshore applicants\n• Processing: 12 weeks\n\n**Queensland (QLD)**\n• Growing tech and healthcare sectors\n• Working in Queensland stream available\n• International graduate pathway\n• Processing: 4-6 weeks\n\n**🌟 EASIER NOMINATION STATES**\n\n**South Australia (SA)**\n• Lower competition\n• Chain migration program\n• International graduate pathway\n• Lower points requirements\n• Processing: 6-8 weeks\n\n**Tasmania (TAS)**\n• Beautiful lifestyle\n• Easier nomination criteria\n• Offshore and onshore streams\n• Job offer not always required\n• Processing: 4-6 weeks\n\n**Western Australia (WA)**\n• Strong in mining and engineering\n• Graduate stream available\n• General skilled migration stream\n• Processing: 8-10 weeks\n\n**💡 NOMINATION BENEFITS**\n✅ +5 points towards your score\n✅ Priority processing\n✅ Pathway to permanent residency\n✅ State government support\n\n**📋 GENERAL REQUIREMENTS**\n• Occupation on state occupation list\n• Meet minimum points (usually 65+)\n• Commitment to live/work in state\n• English proficiency\n• Skills assessment\n\nWhich state interests you most? I can provide specific requirements and current openings!",
        suggestions: [
          "Victoria nomination process",
          "SA vs Tasmania comparison",
          "Regional nomination benefits",
          "Current state occupation lists"
        ]
      };
    }

    // Enhanced English requirements
    if (message.includes('english') || message.includes('ielts') || message.includes('pte')) {
      return {
        content: "🗣️ **English Language Requirements Guide**\n\n**📝 ACCEPTED TESTS**\n• **IELTS Academic** (most popular)\n• **PTE Academic** (computer-based)\n• **TOEFL iBT** (internet-based)\n• **Cambridge English** (C1 Advanced/C2 Proficiency)\n• **OET** (healthcare professionals only)\n\n**🎯 SKILL LEVELS & POINTS**\n\n**Competent English (0 points)**\n• IELTS: 6.0 each band (minimum requirement)\n• PTE: 50 each section\n• TOEFL: L12/R13/W21/S18\n\n**Proficient English (+10 points)**\n• IELTS: 7.0 each band ⭐\n• PTE: 65 each section\n• TOEFL: L24/R24/W27/S23\n\n**Superior English (+20 points)**\n• IELTS: 8.0 each band ⭐⭐\n• PTE: 79 each section\n• TOEFL: L28/R29/W30/S26\n\n**💡 TEST COMPARISON & TIPS**\n\n**IELTS vs PTE:**\n• IELTS: Traditional, human examiner for speaking\n• PTE: Computer-based, faster results (2-5 days)\n• PTE often considered easier for speaking/writing\n• IELTS more widely recognized globally\n\n**📚 PREPARATION STRATEGIES**\n• Take mock tests to identify weak areas\n• Focus on weakest band/section first\n• Practice daily for 2-3 months minimum\n• Consider preparation courses\n• Book test early (high demand in many countries)\n\n**⏰ VALIDITY & RETAKES**\n• Results valid for 3 years\n• Can retake as many times as needed\n• Use best score for visa application\n• Some visa require tests within 3 years of application\n\n**🎯 SCORE IMPROVEMENT TIPS**\n• **Listening:** Practice with Australian accents\n• **Reading:** Improve vocabulary and speed\n• **Writing:** Learn formal essay structure\n• **Speaking:** Practice fluency and pronunciation\n\nNeed specific preparation advice? Tell me your current level and target score!",
        suggestions: [
          "IELTS vs PTE comparison",
          "Improve speaking score tips",
          "Free preparation resources",
          "English requirement exemptions"
        ]
      };
    }

    // General immigration information
    if (message.includes('australia') || message.includes('immigrat') || message.includes('move to australia')) {
      return {
        content: "🇦🇺 **Your Complete Guide to Australian Immigration**\n\n**✨ WHY CHOOSE AUSTRALIA?**\n• World's 3rd best quality of life (OECD)\n• Universal healthcare system (Medicare)\n• Excellent education system\n• Strong economy and job market\n• Multicultural society with 200+ nationalities\n• Beautiful cities: Sydney, Melbourne, Brisbane, Perth\n• Work-life balance culture\n• Pathway to citizenship in 4-5 years\n\n**🛣️ IMMIGRATION PATHWAYS**\n\n**1. Skilled Migration (Most Popular)**\n• Points-based system (65+ points needed)\n• No sponsorship required for subclass 189\n• State nomination available (subclass 190)\n• Regional options (subclass 491)\n\n**2. Employer Sponsorship**\n• Temporary (482) → Permanent (186)\n• Job offer required\n• Faster processing than skilled migration\n\n**3. Study Pathway**\n• Student visa (500) → Temporary Graduate (485) → Skilled visa\n• Popular for career change or skills upgrade\n\n**4. Family/Partner Migration**\n• Partner visas (820/801)\n• Parent visas (103/143)\n• Child visas\n\n**5. Business/Investment**\n• Significant capital investment required\n• Various streams available\n\n**📊 GETTING STARTED CHECKLIST**\n✅ Assess your occupation against skills lists\n✅ Take English proficiency test\n✅ Calculate your points score\n✅ Get skills assessment\n✅ Gather required documents\n✅ Consider state nomination options\n✅ Submit visa application\n\n**💰 ESTIMATED COSTS**\n• Skills assessment: AUD 500-1,500\n• English tests: AUD 370-450\n• Visa application: AUD 4,640\n• Health exams: AUD 300-500\n• Total budget: AUD 8,000-15,000\n\n**⏱️ TYPICAL TIMELINE**\n• Preparation phase: 6-12 months\n• Application processing: 8-18 months\n• Total journey: 12-24 months\n\nI'm here to guide you through every step! What's your background and immigration goal?",
        suggestions: [
          "Assess my eligibility",
          "Calculate total costs",
          "Create my timeline",
          "Compare pathways"
        ]
      };
    }

    // Default response for unmatched queries
    return {
      content: "I'm here to help with your Australian immigration journey! I can provide detailed guidance on:\n\n🔍 **Visa Eligibility & Assessment**\n• All visa types (189, 190, 491, 482, 186, etc.)\n• Personalized eligibility evaluation\n• Best pathway recommendations\n\n📊 **Points Calculation & Strategy**\n• Detailed points breakdown\n• Score improvement strategies\n• Competitive score analysis\n\n📋 **Complete Document Guidance**\n• Personalized checklists by visa type\n• Step-by-step collection process\n• Country-specific requirements\n\n🗺️ **State Nomination Programs**\n• All Australian states comparison\n• Current occupation lists\n• Application processes and requirements\n\n⏱️ **Processing Times & Timelines**\n• Current processing times\n• Application tracking guidance\n• Timeline planning\n\n🗣️ **English Test Requirements**\n• IELTS vs PTE comparison\n• Score improvement strategies\n• Test preparation resources\n\nWhat specific aspect of Australian immigration would you like to explore? I'll provide comprehensive, up-to-date guidance tailored to your situation!",
      suggestions: [
        "Check my visa eligibility",
        "Calculate immigration points",
        "Compare state nominations",
        "Document requirements guide"
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

    // Session-only data handling - no persistent storage
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

      // Session-only data handling - no persistent storage
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
      {/* Fixed Header */}
      <div className="bg-gradient-to-r from-australia-blue to-australia-darkBlue p-4 rounded-t-lg flex-shrink-0">
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

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
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
      </div>

      {/* Fixed Input Area */}
      <div className="p-4 border-t bg-white flex-shrink-0">
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
