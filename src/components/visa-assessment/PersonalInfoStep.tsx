
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentData } from './types';
import { occupations } from './data';
import { validateAge, validateWorkExperience } from './utils';

interface PersonalInfoStepProps {
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ assessmentData, setAssessmentData }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age (minimum 18 years)</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              min="18"
              value={assessmentData.age}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || validateAge(value)) {
                  setAssessmentData({...assessmentData, age: value});
                }
              }}
              className={assessmentData.age && !validateAge(assessmentData.age) ? 'border-red-500' : ''}
            />
            {assessmentData.age && !validateAge(assessmentData.age) && (
              <p className="text-red-500 text-sm mt-1">Age must be at least 18 years</p>
            )}
          </div>
          <div>
            <Label htmlFor="occupation">Occupation</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, occupation: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupations.map((occ) => (
                  <SelectItem key={occ.value} value={occ.value}>
                    {occ.label} ({occ.list})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="education">Highest Education</Label>
            <Select onValueChange={(value) => setAssessmentData({...assessmentData, education: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="doctorate">Doctorate (PhD)</SelectItem>
                <SelectItem value="masters">Masters Degree</SelectItem>
                <SelectItem value="bachelor">Bachelor Degree</SelectItem>
                <SelectItem value="diploma">Diploma/Associate Degree</SelectItem>
                <SelectItem value="highschool">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="experienceOverseas">Overseas Work Experience (Years, optional)</Label>
            <Input
              id="experienceOverseas"
              type="number"
              placeholder="Years in nominated occupation (leave blank if none)"
              min="0"
              value={assessmentData.workExperienceOverseas}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || validateWorkExperience(value)) {
                  setAssessmentData({...assessmentData, workExperienceOverseas: value});
                }
              }}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="experienceAustralia">Australian Work Experience (Years, optional)</Label>
            <Input
              id="experienceAustralia"
              type="number"
              placeholder="Years of Australian work experience (leave blank if none)"
              min="0"
              value={assessmentData.workExperienceAustralia}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || validateWorkExperience(value)) {
                  setAssessmentData({...assessmentData, workExperienceAustralia: value});
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
