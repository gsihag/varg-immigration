import { 
  Calculator, 
  FileText, 
  Clock, 
  Users, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Globe, 
  CalendarDays 
} from 'lucide-react';

interface ChatMessage {
  type: 'user' | 'agent';
  message: string;
}

interface UserContext {
  visaTypes: string[];
  occupation: string | null;
  experience: string | null;
  currentStatus: string | null;
  familySituation: string | null;
  concerns: string[];
  stage: 'exploring' | 'planning' | 'preparing' | 'applying';
  hasDiscussed: string[];
}

interface ContextualSuggestion {
  icon: any;
  text: string;
  color: string;
  priority: number;
}

export const analyzeUserContext = (messages: ChatMessage[]): UserContext => {
  const context: UserContext = {
    visaTypes: [],
    occupation: null,
    experience: null,
    currentStatus: null,
    familySituation: null,
    concerns: [],
    stage: 'exploring',
    hasDiscussed: []
  };

  const allText = messages.map(m => m.message.toLowerCase()).join(' ');

  // Detect visa types mentioned
  const visaKeywords = {
    'skilled': ['skilled', '189', '190', '491', 'independent', 'nominated'],
    'student': ['student', '500', 'study', 'education', 'university'],
    'partner': ['partner', 'spouse', 'marriage', '820', '801', '309', '100'],
    'family': ['family', 'parent', 'child', 'relative'],
    'work': ['work', '482', 'employer', 'sponsor', 'temporary skill'],
    'business': ['business', 'investor', 'entrepreneur']
  };

  Object.entries(visaKeywords).forEach(([visa, keywords]) => {
    if (keywords.some(keyword => allText.includes(keyword))) {
      context.visaTypes.push(visa);
    }
  });

  // Detect occupation
  const occupations = [
    'software engineer', 'developer', 'programmer', 'accountant', 'nurse',
    'teacher', 'doctor', 'engineer', 'analyst', 'manager', 'chef', 'electrician'
  ];
  const foundOccupation = occupations.find(occ => allText.includes(occ));
  if (foundOccupation) context.occupation = foundOccupation;

  // Detect experience level
  if (allText.includes('year') && allText.includes('experience')) {
    const experienceMatch = allText.match(/(\d+)\s*year/);
    if (experienceMatch) {
      context.experience = `${experienceMatch[1]} years`;
    }
  }

  // Detect current status
  const statusKeywords = {
    'student': ['studying', 'student visa', 'currently study'],
    'tourist': ['tourist', 'visitor', 'visiting'],
    'offshore': ['outside australia', 'from overseas', 'not in australia'],
    'working': ['working', 'employed', 'job in australia']
  };

  Object.entries(statusKeywords).forEach(([status, keywords]) => {
    if (keywords.some(keyword => allText.includes(keyword))) {
      context.currentStatus = status;
    }
  });

  // Detect family situation
  if (allText.includes('spouse') || allText.includes('wife') || allText.includes('husband')) {
    context.familySituation = 'married';
  }
  if (allText.includes('child') || allText.includes('family')) {
    context.familySituation = context.familySituation ? 'married_with_children' : 'with_family';
  }

  // Detect concerns and topics discussed
  const concerns = ['cost', 'time', 'document', 'english', 'points', 'age'];
  context.concerns = concerns.filter(concern => allText.includes(concern));

  const discussedTopics = ['points', 'eligibility', 'documents', 'processing time', 'requirements'];
  context.hasDiscussed = discussedTopics.filter(topic => 
    allText.includes(topic.toLowerCase())
  );

  // Determine stage
  if (context.hasDiscussed.includes('documents') || allText.includes('apply')) {
    context.stage = 'preparing';
  } else if (context.hasDiscussed.length > 2) {
    context.stage = 'planning';
  } else if (context.visaTypes.length > 0) {
    context.stage = 'exploring';
  }

  return context;
};

export const generateContextualSuggestions = (context: UserContext, language: string = 'en') => {
  const suggestions: ContextualSuggestion[] = [];

  const suggestionTemplates = {
    en: {
      // Exploring stage suggestions
      exploreEligibility: { text: "Check my eligibility for skilled migration", icon: CheckCircle, color: "bg-green-500 hover:bg-green-600" },
      explorePoints: { text: "Calculate my points score", icon: Calculator, color: "bg-blue-500 hover:bg-blue-600" },
      exploreVisaOptions: { text: "Compare visa pathways for my situation", icon: MapPin, color: "bg-purple-500 hover:bg-purple-600" },
      
      // Occupation-specific suggestions
      skillsAssessment: { text: "Skills assessment requirements for my occupation", icon: GraduationCap, color: "bg-indigo-500 hover:bg-indigo-600" },
      occupationList: { text: "Check if my occupation is on the skills list", icon: FileText, color: "bg-orange-500 hover:bg-orange-600" },
      
      // Planning stage suggestions
      stateNomination: { text: "State nomination options for my occupation", icon: MapPin, color: "bg-teal-500 hover:bg-teal-600" },
      englishRequirements: { text: "English test requirements and scoring", icon: Globe, color: "bg-cyan-500 hover:bg-cyan-600" },
      processingTimes: { text: "Current processing times for my visa type", icon: Clock, color: "bg-amber-500 hover:bg-amber-600" },
      
      // Family-related suggestions
      familyVisa: { text: "Bringing family to Australia", icon: Users, color: "bg-pink-500 hover:bg-pink-600" },
      partnerVisa: { text: "Partner visa requirements and process", icon: Heart, color: "bg-red-500 hover:bg-red-600" },
      
      // Cost and timeline suggestions
      visaCosts: { text: "Complete cost breakdown for my visa pathway", icon: DollarSign, color: "bg-emerald-500 hover:bg-emerald-600" },
      timeline: { text: "Immigration timeline and planning guide", icon: CalendarDays, color: "bg-violet-500 hover:bg-violet-600" },
      
      // Student-specific suggestions
      studentToSkilled: { text: "Student to skilled migration pathway", icon: GraduationCap, color: "bg-blue-600 hover:bg-blue-700" },
      postStudyWork: { text: "Post-study work visa options", icon: Briefcase, color: "bg-gray-600 hover:bg-gray-700" },
      
      // Document preparation suggestions
      documentChecklist: { text: "Document checklist for my application", icon: FileText, color: "bg-slate-500 hover:bg-slate-600" },
      healthRequirements: { text: "Health and character requirements", icon: AlertCircle, color: "bg-yellow-500 hover:bg-yellow-600" },
      
      // Advanced planning
      bridgingVisa: { text: "Bridging visa requirements", icon: Clock, color: "bg-indigo-400 hover:bg-indigo-500" },
      nextSteps: { text: "What should I do next in my journey?", icon: CheckCircle, color: "bg-green-600 hover:bg-green-700" }
    },
    hi: {
      // Hindi translations for key suggestions
      exploreEligibility: { text: "कुशल प्रवासन के लिए मेरी पात्रता जांचें", icon: CheckCircle, color: "bg-green-500 hover:bg-green-600" },
      explorePoints: { text: "मेरे अंकों की गणना करें", icon: Calculator, color: "bg-blue-500 hover:bg-blue-600" },
      exploreVisaOptions: { text: "मेरी स्थिति के लिए वीज़ा मार्गों की तुलना करें", icon: MapPin, color: "bg-purple-500 hover:bg-purple-600" },
      skillsAssessment: { text: "मेरे व्यवसाय के लिए कौशल मूल्यांकन आवश्यकताएं", icon: GraduationCap, color: "bg-indigo-500 hover:bg-indigo-600" },
      familyVisa: { text: "परिवार को ऑस्ट्रेलिया लाना", icon: Users, color: "bg-pink-500 hover:bg-pink-600" }
    }
  };

  const templates = suggestionTemplates[language] || suggestionTemplates.en;

  // Generate suggestions based on context
  if (context.stage === 'exploring') {
    // Early exploration suggestions
    suggestions.push(templates.exploreEligibility);
    
    if (context.visaTypes.includes('skilled')) {
      suggestions.push(templates.explorePoints);
    }
    
    if (!context.hasDiscussed.includes('eligibility')) {
      suggestions.push(templates.exploreVisaOptions);
    }
    
    if (context.occupation && !context.hasDiscussed.includes('requirements')) {
      suggestions.push(templates.occupationList);
    }
  }

  if (context.stage === 'planning') {
    // Planning stage suggestions
    if (context.occupation && !context.hasDiscussed.includes('documents')) {
      suggestions.push(templates.skillsAssessment);
    }
    
    if (context.visaTypes.includes('skilled') && !context.hasDiscussed.includes('points')) {
      suggestions.push(templates.stateNomination);
    }
    
    if (!context.concerns.includes('english')) {
      suggestions.push(templates.englishRequirements);
    }
    
    if (!context.hasDiscussed.includes('processing time')) {
      suggestions.push(templates.processingTimes);
    }
  }

  if (context.stage === 'preparing') {
    // Preparation stage suggestions
    suggestions.push(templates.documentChecklist);
    suggestions.push(templates.healthRequirements);
    
    if (!context.concerns.includes('cost')) {
      suggestions.push(templates.visaCosts);
    }
  }

  // Family-specific suggestions
  if (context.familySituation === 'married' && !context.visaTypes.includes('partner')) {
    suggestions.push(templates.familyVisa);
  }
  
  if (context.familySituation && context.visaTypes.includes('partner')) {
    suggestions.push(templates.partnerVisa);
  }

  // Student-specific suggestions
  if (context.currentStatus === 'student') {
    suggestions.push(templates.studentToSkilled);
    suggestions.push(templates.postStudyWork);
  }

  // Always include timeline if not discussed
  if (!context.hasDiscussed.includes('processing time') && suggestions.length < 4) {
    suggestions.push(templates.timeline);
  }

  // Add next steps if user seems ready
  if (context.hasDiscussed.length > 3) {
    suggestions.push(templates.nextSteps);
  }

  // Sort by priority and return top 5
  return suggestions.slice(0, 5);
};
