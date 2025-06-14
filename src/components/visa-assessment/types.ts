
export interface AssessmentData {
  age: string;
  occupation: string;
  education: string;
  englishTest: string;
  englishScores: {
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
  };
  workExperienceAustralia: string;
  workExperienceOverseas: string;
  currentLocation: string;
  visaStatus: string;
  familyStatus: string;
  
  // Australian Study Requirements
  hasAustralianQualification: boolean | null;
  isFromRegionalAustralia: boolean | null;
  hasMastersOrDoctorate: boolean | null;
  hasNAATICredential: boolean | null;
  hasCompletedProfessionalYear: boolean | null;
  
  // Partner Skills
  partnerStatus: string;
  partnerEnglishTest: string;
  partnerEnglishScores: {
    listening: string;
    reading: string;
    writing: string;
    speaking: string;
  };
  partnerHasSkillAssessment: boolean | null;
  
  stateInterest: string;
}

export interface PointsBreakdown {
  age: number;
  english: number;
  education: number;
  experience: number;
  australianExperience: number;
  australianStudy: number;
  naati: number;
  professionalYear: number;
  partner: number;
  total: number;
}

export interface VisaRecommendation {
  visa: string;
  chance: string;
  description: string;
}

export interface Improvement {
  area: string;
  current: string;
  potential: string;
  action: string;
}

export interface Recommendations {
  eligible: VisaRecommendation[];
  improvements: Improvement[];
  strategy: string;
  nextSteps: string[];
}

export interface Occupation {
  value: string;
  label: string;
  list: string;
  assessment: string;
}
