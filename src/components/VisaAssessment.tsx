
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { AssessmentData, PointsBreakdown, Recommendations } from './visa-assessment/types';
import { calculatePoints, generateRecommendations, validateAge } from './visa-assessment/utils';
import QuestionStep from './visa-assessment/QuestionStep';
import ResultsDisplay from './visa-assessment/ResultsDisplay';

const VisaAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    age: '',
    occupation: '',
    education: '',
    englishTest: '',
    englishScores: {
      listening: '',
      reading: '',
      writing: '',
      speaking: ''
    },
    workExperienceAustralia: '',
    workExperienceOverseas: '',
    currentLocation: '',
    visaStatus: '',
    familyStatus: '',
    hasAustralianQualification: null,
    isFromRegionalAustralia: null,
    hasMastersOrDoctorate: null,
    hasNAATICredential: null,
    hasCompletedProfessionalYear: null,
    partnerStatus: '',
    partnerEnglishTest: '',
    partnerEnglishScores: {
      listening: '',
      reading: '',
      writing: '',
      speaking: ''
    },
    partnerHasSkillAssessment: null,
    stateInterest: '',
    australianStudy: '',
    regionalStudy: '',
    mastersPhd: '',
    naatiCredential: '',
    professionalYear: ''
  });
  const [pointsBreakdown, setPointsBreakdown] = useState<PointsBreakdown | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);

  const totalQuestions = 11;

  const getCanProceed = () => {
    switch (currentQuestion) {
      case 1:
        return assessmentData.age && validateAge(assessmentData.age);
      case 2:
        return assessmentData.englishTest && Object.values(assessmentData.englishScores).some(score => score !== '');
      case 3:
        return assessmentData.education && assessmentData.occupation;
      case 4:
        return true; // Work experience is optional
      case 5:
        return assessmentData.hasAustralianQualification !== null;
      case 6:
        return assessmentData.hasAustralianQualification === false || assessmentData.isFromRegionalAustralia !== null;
      case 7:
        return assessmentData.hasMastersOrDoctorate !== null;
      case 8:
        return assessmentData.hasNAATICredential !== null;
      case 9:
        return assessmentData.hasCompletedProfessionalYear !== null;
      case 10:
        return assessmentData.partnerStatus !== '';
      case 11:
        if (assessmentData.partnerStatus !== 'non-australian') return true;
        return assessmentData.partnerEnglishTest && 
               Object.values(assessmentData.partnerEnglishScores).some(score => score !== '') &&
               assessmentData.partnerHasSkillAssessment !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      // Skip question 6 if no Australian qualification
      if (currentQuestion === 5 && assessmentData.hasAustralianQualification === false) {
        setCurrentQuestion(7);
      }
      // Skip question 11 if not applicable
      else if (currentQuestion === 10 && assessmentData.partnerStatus !== 'non-australian') {
        // Calculate results
        const points = calculatePoints(assessmentData);
        const recs = generateRecommendations(points, assessmentData);
        setPointsBreakdown(points);
        setRecommendations(recs);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      // Calculate results
      const points = calculatePoints(assessmentData);
      const recs = generateRecommendations(points, assessmentData);
      setPointsBreakdown(points);
      setRecommendations(recs);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      // Handle skipped questions when going back
      if (currentQuestion === 7 && assessmentData.hasAustralianQualification === false) {
        setCurrentQuestion(5);
      } else {
        setCurrentQuestion(currentQuestion - 1);
      }
    }
  };

  const handleStartNew = () => {
    setCurrentQuestion(1);
    setPointsBreakdown(null);
    setRecommendations(null);
    setAssessmentData({
      age: '',
      occupation: '',
      education: '',
      englishTest: '',
      englishScores: {
        listening: '',
        reading: '',
        writing: '',
        speaking: ''
      },
      workExperienceAustralia: '',
      workExperienceOverseas: '',
      currentLocation: '',
      visaStatus: '',
      familyStatus: '',
      hasAustralianQualification: null,
      isFromRegionalAustralia: null,
      hasMastersOrDoctorate: null,
      hasNAATICredential: null,
      hasCompletedProfessionalYear: null,
      partnerStatus: '',
      partnerEnglishTest: '',
      partnerEnglishScores: {
        listening: '',
        reading: '',
        writing: '',
        speaking: ''
      },
      partnerHasSkillAssessment: null,
      stateInterest: '',
      australianStudy: '',
      regionalStudy: '',
      mastersPhd: '',
      naatiCredential: '',
      professionalYear: ''
    });
  };

  if (pointsBreakdown && recommendations) {
    return (
      <ResultsDisplay
        pointsBreakdown={pointsBreakdown}
        recommendations={recommendations}
        assessmentData={assessmentData}
        onStartNew={handleStartNew}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header with Enhanced Contrast */}
      <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-200">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-3xl font-bold text-gray-900">Australian Visa Assessment</h2>
            <span className="text-lg font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Question {currentQuestion} of {totalQuestions}
            </span>
          </div>
          <Progress value={(currentQuestion / totalQuestions) * 100} className="h-4 bg-gray-200" />
          <p className="text-base text-gray-700 mt-3 font-medium">
            Answer each question to get your personalized visa eligibility report
          </p>
        </div>
      </div>

      {/* Question Step with Enhanced Styling */}
      <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200">
        <QuestionStep
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          assessmentData={assessmentData}
          setAssessmentData={setAssessmentData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canProceed={getCanProceed()}
        />
      </div>
    </div>
  );
};

export default VisaAssessment;
