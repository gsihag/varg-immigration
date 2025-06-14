
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentData, PointsBreakdown, Recommendations } from './visa-assessment/types';
import { calculatePoints, generateRecommendations, validateAge, validateWorkExperience } from './visa-assessment/utils';
import PersonalInfoStep from './visa-assessment/PersonalInfoStep';
import EnglishProficiencyStep from './visa-assessment/EnglishProficiencyStep';
import CurrentStatusStep from './visa-assessment/CurrentStatusStep';
import AdditionalInfoStep from './visa-assessment/AdditionalInfoStep';
import ResultsDisplay from './visa-assessment/ResultsDisplay';

const VisaAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    australianStudy: false,
    stateInterest: ''
  });
  const [pointsBreakdown, setPointsBreakdown] = useState<PointsBreakdown | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);

  const handleStepComplete = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      const points = calculatePoints(assessmentData);
      const recs = generateRecommendations(points, assessmentData);
      setPointsBreakdown(points);
      setRecommendations(recs);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  const handleStartNew = () => {
    setCurrentStep(1);
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
      australianStudy: false,
      stateInterest: ''
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
      {/* Progress Header */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Visa Eligibility Assessment</h2>
              <span className="text-sm text-gray-500">Step {currentStep} of 4</span>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <PersonalInfoStep 
              assessmentData={assessmentData} 
              setAssessmentData={setAssessmentData} 
            />
          )}

          {currentStep === 2 && (
            <EnglishProficiencyStep 
              assessmentData={assessmentData} 
              setAssessmentData={setAssessmentData} 
            />
          )}

          {currentStep === 3 && (
            <CurrentStatusStep 
              assessmentData={assessmentData} 
              setAssessmentData={setAssessmentData} 
            />
          )}

          {currentStep === 4 && (
            <AdditionalInfoStep 
              assessmentData={assessmentData} 
              setAssessmentData={setAssessmentData} 
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleStepComplete}
              disabled={
                (currentStep === 1 && (!assessmentData.age || !validateAge(assessmentData.age) || !assessmentData.occupation || !assessmentData.education)) ||
                (currentStep === 2 && (!assessmentData.englishTest || Object.values(assessmentData.englishScores).every(score => score === ''))) ||
                (currentStep === 3 && (!assessmentData.currentLocation || !assessmentData.familyStatus)) ||
                (currentStep === 4 && false)
              }
              className="bg-australia-blue hover:bg-australia-darkBlue"
            >
              {currentStep === 4 ? 'Calculate Results' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisaAssessment;
