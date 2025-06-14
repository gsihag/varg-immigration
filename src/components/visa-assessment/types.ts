
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
  australianStudy: boolean;
  stateInterest: string;
}

export interface PointsBreakdown {
  age: number;
  english: number;
  education: number;
  experience: number;
  australianExperience: number;
  bonus: number;
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
