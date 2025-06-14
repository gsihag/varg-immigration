
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentData } from './types';

interface EnglishProficiencyStepProps {
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
}

const EnglishProficiencyStep: React.FC<EnglishProficiencyStepProps> = ({ assessmentData, setAssessmentData }) => {
  const updateEnglishScore = (section: string, value: string) => {
    setAssessmentData({
      ...assessmentData,
      englishScores: {
        ...assessmentData.englishScores,
        [section]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">English Proficiency</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="englishTest">English Test Type</Label>
            <Select onValueChange={(value) => {
              setAssessmentData({
                ...assessmentData, 
                englishTest: value,
                englishScores: { listening: '', reading: '', writing: '', speaking: '' }
              });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ielts">IELTS Academic</SelectItem>
                <SelectItem value="pte">PTE Academic</SelectItem>
                <SelectItem value="toefl">TOEFL iBT</SelectItem>
                <SelectItem value="cambridge">Cambridge English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {assessmentData.englishTest && (
            <div className="space-y-4">
              <h4 className="font-medium">Individual Section Scores:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="listening">Listening</Label>
                  <Input
                    id="listening"
                    type="number"
                    step={assessmentData.englishTest === 'ielts' ? '0.5' : '1'}
                    placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                    value={assessmentData.englishScores.listening}
                    onChange={(e) => updateEnglishScore('listening', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="reading">Reading</Label>
                  <Input
                    id="reading"
                    type="number"
                    step={assessmentData.englishTest === 'ielts' ? '0.5' : '1'}
                    placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                    value={assessmentData.englishScores.reading}
                    onChange={(e) => updateEnglishScore('reading', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="writing">Writing</Label>
                  <Input
                    id="writing"
                    type="number"
                    step={assessmentData.englishTest === 'ielts' ? '0.5' : '1'}
                    placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                    value={assessmentData.englishScores.writing}
                    onChange={(e) => updateEnglishScore('writing', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="speaking">Speaking</Label>
                  <Input
                    id="speaking"
                    type="number"
                    step={assessmentData.englishTest === 'ielts' ? '0.5' : '1'}
                    placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                    value={assessmentData.englishScores.speaking}
                    onChange={(e) => updateEnglishScore('speaking', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Score Guidelines for {assessmentData.englishTest.toUpperCase()}:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Competent (0 points):</span>
                    <br />
                    {assessmentData.englishTest === 'ielts' ? '6.0 each band' : 
                     assessmentData.englishTest === 'pte' ? '50 each section' : '6.0 each section'}
                  </div>
                  <div>
                    <span className="font-medium">Proficient (+10 points):</span>
                    <br />
                    {assessmentData.englishTest === 'ielts' ? '7.0 each band' : 
                     assessmentData.englishTest === 'pte' ? '65 each section' : '7.0 each section'}
                  </div>
                  <div>
                    <span className="font-medium">Superior (+20 points):</span>
                    <br />
                    {assessmentData.englishTest === 'ielts' ? '8.0 each band' : 
                     assessmentData.englishTest === 'pte' ? '79 each section' : '8.0 each section'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishProficiencyStep;
