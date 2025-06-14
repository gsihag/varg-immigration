
import { AssessmentData, PointsBreakdown, Recommendations, Occupation } from './types';
import { occupations } from './data';

export const calculatePoints = (assessmentData: AssessmentData): PointsBreakdown => {
  const breakdown: PointsBreakdown = {
    age: 0,
    english: 0,
    education: 0,
    experience: 0,
    australianExperience: 0,
    bonus: 0,
    total: 0
  };

  // Age points (minimum 18)
  const age = parseInt(assessmentData.age);
  if (age >= 18 && age <= 24) breakdown.age = 25;
  else if (age >= 25 && age <= 32) breakdown.age = 30;
  else if (age >= 33 && age <= 39) breakdown.age = 25;
  else if (age >= 40 && age <= 44) breakdown.age = 15;

  // English points based on individual section scores
  const { listening, reading, writing, speaking } = assessmentData.englishScores;
  const scores = [
    parseFloat(listening) || 0,
    parseFloat(reading) || 0,
    parseFloat(writing) || 0,
    parseFloat(speaking) || 0
  ];

  if (assessmentData.englishTest === 'ielts') {
    if (scores.every(score => score >= 8.0)) breakdown.english = 20;
    else if (scores.every(score => score >= 7.0)) breakdown.english = 10;
  } else if (assessmentData.englishTest === 'pte') {
    if (scores.every(score => score >= 79)) breakdown.english = 20;
    else if (scores.every(score => score >= 65)) breakdown.english = 10;
  }

  // Education points
  switch (assessmentData.education) {
    case 'doctorate': breakdown.education = 20; break;
    case 'bachelor': case 'masters': breakdown.education = 15; break;
    case 'diploma': breakdown.education = 10; break;
    case 'highschool': breakdown.education = 5; break;
  }

  // Overseas work experience points - default to 0 if empty
  const overseasExperience = parseInt(assessmentData.workExperienceOverseas) || 0;
  if (overseasExperience >= 8) breakdown.experience = 15;
  else if (overseasExperience >= 5) breakdown.experience = 10;
  else if (overseasExperience >= 3) breakdown.experience = 5;

  // Australian work experience points - default to 0 if empty
  const australianExperience = parseInt(assessmentData.workExperienceAustralia) || 0;
  if (australianExperience >= 8) breakdown.australianExperience = 20;
  else if (australianExperience >= 5) breakdown.australianExperience = 15;
  else if (australianExperience >= 3) breakdown.australianExperience = 10;
  else if (australianExperience >= 1) breakdown.australianExperience = 5;

  // Bonus points
  if (assessmentData.australianStudy) breakdown.bonus += 5;

  breakdown.total = breakdown.age + breakdown.english + breakdown.education + breakdown.experience + breakdown.australianExperience + breakdown.bonus;
  
  return breakdown;
};

export const generateRecommendations = (points: PointsBreakdown, assessmentData: AssessmentData): Recommendations => {
  const selectedOccupation = occupations.find(occ => occ.value === assessmentData.occupation);
  
  const recommendations: Recommendations = {
    eligible: [],
    improvements: [],
    strategy: '',
    nextSteps: []
  };

  // Visa eligibility assessment
  if (points.total >= 65) {
    if (selectedOccupation?.list === 'MLTSSL') {
      recommendations.eligible.push({
        visa: 'Subclass 189 - Skilled Independent',
        chance: points.total >= 90 ? 'Excellent' : points.total >= 80 ? 'Good' : 'Fair',
        description: 'No sponsorship required, live anywhere in Australia'
      });
    }
    
    recommendations.eligible.push({
      visa: 'Subclass 190 - State Nominated',
      chance: points.total >= 85 ? 'Excellent' : points.total >= 75 ? 'Good' : 'Fair',
      description: '+5 points with state nomination, must live in nominating state'
    });

    recommendations.eligible.push({
      visa: 'Subclass 491 - Regional Skilled',
      chance: points.total >= 75 ? 'Excellent' : 'Good',
      description: '+15 points with regional nomination, 5-year pathway to PR'
    });
  }

  // Improvement suggestions
  if (points.english < 20) {
    const scores = Object.values(assessmentData.englishScores);
    const hasScores = scores.some(score => score !== '');
    if (hasScores) {
      recommendations.improvements.push({
        area: 'English Proficiency',
        current: `${points.english} points`,
        potential: '+10-20 points',
        action: 'Achieve IELTS 7.0+ (Proficient) or 8.0+ (Superior)'
      });
    }
  }

  if (points.age < 30 && parseInt(assessmentData.age) > 32) {
    recommendations.improvements.push({
      area: 'Age Factor',
      current: `${points.age} points`,
      potential: 'Time-sensitive',
      action: 'Apply as soon as possible - points decrease with age'
    });
  }

  if (!assessmentData.australianStudy) {
    recommendations.improvements.push({
      area: 'Australian Study',
      current: '0 points',
      potential: '+5 points',
      action: 'Consider Professional Year or additional Australian qualification'
    });
  }

  if (parseInt(assessmentData.workExperienceAustralia) < 3) {
    recommendations.improvements.push({
      area: 'Australian Work Experience',
      current: `${points.australianExperience} points`,
      potential: '+5-20 points',
      action: 'Gain Australian work experience in your nominated occupation'
    });
  }

  // Strategy recommendation
  if (points.total >= 90) {
    recommendations.strategy = 'Excellent profile! Apply for Subclass 189 with high invitation chances.';
  } else if (points.total >= 80) {
    recommendations.strategy = 'Strong profile. Consider state nomination for faster processing.';
  } else if (points.total >= 65) {
    recommendations.strategy = 'Eligible but competitive. Focus on state nomination and points improvement.';
  } else {
    recommendations.strategy = 'Below minimum threshold. Focus on improving English and gaining experience.';
  }

  // Next steps
  if (points.total >= 65) {
    recommendations.nextSteps = [
      'Get skills assessment from ' + (selectedOccupation?.assessment || 'relevant authority'),
      'Research state nomination programs',
      'Prepare comprehensive document checklist',
      'Consider EOI submission timing'
    ];
  } else {
    recommendations.nextSteps = [
      'Improve English test scores',
      'Gain additional work experience',
      'Consider Australian study pathway',
      'Research alternative visa options'
    ];
  }

  return recommendations;
};

export const validateAge = (value: string): boolean => {
  const age = parseInt(value);
  return age >= 18;
};

export const validateWorkExperience = (value: string): boolean => {
  const years = parseInt(value) || 0;
  return years >= 0;
};

export const getEnglishScoreDisplay = (englishScores: AssessmentData['englishScores']): string => {
  const { listening, reading, writing, speaking } = englishScores;
  const scores = [listening, reading, writing, speaking].filter(score => score !== '');
  if (scores.length === 0) return '';
  return `L:${listening || '-'} R:${reading || '-'} W:${writing || '-'} S:${speaking || '-'}`;
};
