
import React from 'react';
import { Label } from '@/components/ui/label';
import { AssessmentData } from './types';
import { occupations } from './data';
import { getEnglishScoreDisplay } from './utils';

interface AdditionalInfoStepProps {
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({ assessmentData, setAssessmentData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="australianStudy"
              checked={assessmentData.australianStudy}
              onChange={(e) => setAssessmentData({...assessmentData, australianStudy: e.target.checked})}
            />
            <Label htmlFor="australianStudy">
              I have completed 2+ years of Australian study (+5 points)
            </Label>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Review Your Information:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>Age: {assessmentData.age}</div>
              <div>Occupation: {occupations.find(o => o.value === assessmentData.occupation)?.label}</div>
              <div>Education: {assessmentData.education}</div>
              <div>Overseas Experience: {assessmentData.workExperienceOverseas} years</div>
              <div>Australian Experience: {assessmentData.workExperienceAustralia} years</div>
              <div>English: {assessmentData.englishTest?.toUpperCase()} {getEnglishScoreDisplay(assessmentData.englishScores)}</div>
              <div>Location: {assessmentData.currentLocation}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;
