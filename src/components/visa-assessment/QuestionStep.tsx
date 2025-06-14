
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AssessmentData } from './types';
import { occupations } from './data';

interface QuestionStepProps {
  currentQuestion: number;
  totalQuestions: number;
  assessmentData: AssessmentData;
  setAssessmentData: (data: AssessmentData) => void;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

const QuestionStep: React.FC<QuestionStepProps> = ({
  currentQuestion,
  totalQuestions,
  assessmentData,
  setAssessmentData,
  onNext,
  onPrevious,
  canProceed
}) => {
  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your age?</h3>
            <p className="text-gray-600">You must be at least 18 years old to be eligible.</p>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                min="18"
                value={assessmentData.age}
                onChange={(e) => setAssessmentData({...assessmentData, age: e.target.value})}
                className="max-w-xs"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your English proficiency?</h3>
            <p className="text-gray-600">Select your English test type and enter your scores.</p>
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
                  <SelectTrigger className="max-w-xs">
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
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div>
                    <Label htmlFor="listening">Listening</Label>
                    <Input
                      id="listening"
                      type="number"
                      step={assessmentData.englishTest === 'ielts' ? '0.5' : '1'}
                      placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                      value={assessmentData.englishScores.listening}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        englishScores: { ...assessmentData.englishScores, listening: e.target.value }
                      })}
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
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        englishScores: { ...assessmentData.englishScores, reading: e.target.value }
                      })}
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
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        englishScores: { ...assessmentData.englishScores, writing: e.target.value }
                      })}
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
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        englishScores: { ...assessmentData.englishScores, speaking: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your highest education level?</h3>
            <div>
              <Label htmlFor="education">Education Level</Label>
              <Select onValueChange={(value) => setAssessmentData({...assessmentData, education: value})}>
                <SelectTrigger className="max-w-xs">
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
              <Label htmlFor="occupation">Your Occupation</Label>
              <Select onValueChange={(value) => setAssessmentData({...assessmentData, occupation: value})}>
                <SelectTrigger className="max-w-xs">
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
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your work experience?</h3>
            <p className="text-gray-600">Enter your years of work experience in your nominated occupation.</p>
            <div className="space-y-4 max-w-xs">
              <div>
                <Label htmlFor="experienceOverseas">Overseas Work Experience (Years)</Label>
                <Input
                  id="experienceOverseas"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={assessmentData.workExperienceOverseas}
                  onChange={(e) => setAssessmentData({...assessmentData, workExperienceOverseas: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="experienceAustralia">Australian Work Experience (Years)</Label>
                <Input
                  id="experienceAustralia"
                  type="number"
                  placeholder="0"
                  min="0"
                  value={assessmentData.workExperienceAustralia}
                  onChange={(e) => setAssessmentData({...assessmentData, workExperienceAustralia: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Do you have at least 1 degree, diploma or trade qualification from an Australian educational institution with at least 2 academic years?</h3>
            <div className="space-y-2">
              <Button
                variant={assessmentData.hasAustralianQualification === true ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasAustralianQualification: true})}
              >
                Yes
              </Button>
              <Button
                variant={assessmentData.hasAustralianQualification === false ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasAustralianQualification: false})}
              >
                No
              </Button>
            </div>
          </div>
        );

      case 6:
        if (assessmentData.hasAustralianQualification === false) {
          return renderQuestion7(); // Skip to question 7
        }
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Is your Australian qualification from regional Australia?</h3>
            <div className="space-y-2">
              <Button
                variant={assessmentData.isFromRegionalAustralia === true ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, isFromRegionalAustralia: true})}
              >
                Yes
              </Button>
              <Button
                variant={assessmentData.isFromRegionalAustralia === false ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, isFromRegionalAustralia: false})}
              >
                No
              </Button>
            </div>
          </div>
        );

      case 7:
        return renderQuestion7();

      case 8:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Do you have a community language credential for interpreting or translating by NAATI?</h3>
            <p className="text-gray-600">National Accreditation Authority for Translators and Interpreters</p>
            <div className="space-y-2">
              <Button
                variant={assessmentData.hasNAATICredential === true ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasNAATICredential: true})}
              >
                Yes
              </Button>
              <Button
                variant={assessmentData.hasNAATICredential === false ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasNAATICredential: false})}
              >
                No
              </Button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Did you complete a professional year in Australia?</h3>
            <div className="space-y-2">
              <Button
                variant={assessmentData.hasCompletedProfessionalYear === true ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasCompletedProfessionalYear: true})}
              >
                Yes
              </Button>
              <Button
                variant={assessmentData.hasCompletedProfessionalYear === false ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, hasCompletedProfessionalYear: false})}
              >
                No
              </Button>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What is your partner status?</h3>
            <div className="space-y-2">
              <Button
                variant={assessmentData.partnerStatus === 'single' ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, partnerStatus: 'single'})}
                className="w-full justify-start"
              >
                Single
              </Button>
              <Button
                variant={assessmentData.partnerStatus === 'australian-citizen' ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, partnerStatus: 'australian-citizen'})}
                className="w-full justify-start"
              >
                Partner is Australian Citizen or PR
              </Button>
              <Button
                variant={assessmentData.partnerStatus === 'non-australian' ? "default" : "outline"}
                onClick={() => setAssessmentData({...assessmentData, partnerStatus: 'non-australian'})}
                className="w-full justify-start"
              >
                Partner is not Australian Citizen/PR (with skills assessment and English)
              </Button>
            </div>
          </div>
        );

      case 11:
        if (assessmentData.partnerStatus !== 'non-australian') {
          return null; // Skip this question
        }
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Partner's English Test Scores</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="partnerEnglishTest">Partner's English Test Type</Label>
                <Select onValueChange={(value) => {
                  setAssessmentData({
                    ...assessmentData, 
                    partnerEnglishTest: value,
                    partnerEnglishScores: { listening: '', reading: '', writing: '', speaking: '' }
                  });
                }}>
                  <SelectTrigger className="max-w-xs">
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

              {assessmentData.partnerEnglishTest && (
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div>
                    <Label htmlFor="partnerListening">Listening</Label>
                    <Input
                      id="partnerListening"
                      type="number"
                      step={assessmentData.partnerEnglishTest === 'ielts' ? '0.5' : '1'}
                      value={assessmentData.partnerEnglishScores.listening}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        partnerEnglishScores: { ...assessmentData.partnerEnglishScores, listening: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerReading">Reading</Label>
                    <Input
                      id="partnerReading"
                      type="number"
                      step={assessmentData.partnerEnglishTest === 'ielts' ? '0.5' : '1'}
                      value={assessmentData.partnerEnglishScores.reading}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        partnerEnglishScores: { ...assessmentData.partnerEnglishScores, reading: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerWriting">Writing</Label>
                    <Input
                      id="partnerWriting"
                      type="number"
                      step={assessmentData.partnerEnglishTest === 'ielts' ? '0.5' : '1'}
                      value={assessmentData.partnerEnglishScores.writing}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        partnerEnglishScores: { ...assessmentData.partnerEnglishScores, writing: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerSpeaking">Speaking</Label>
                    <Input
                      id="partnerSpeaking"
                      type="number"
                      step={assessmentData.partnerEnglishTest === 'ielts' ? '0.5' : '1'}
                      value={assessmentData.partnerEnglishScores.speaking}
                      onChange={(e) => setAssessmentData({
                        ...assessmentData,
                        partnerEnglishScores: { ...assessmentData.partnerEnglishScores, speaking: e.target.value }
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Does your partner have a positive skills assessment?</h4>
                <Button
                  variant={assessmentData.partnerHasSkillAssessment === true ? "default" : "outline"}
                  onClick={() => setAssessmentData({...assessmentData, partnerHasSkillAssessment: true})}
                >
                  Yes
                </Button>
                <Button
                  variant={assessmentData.partnerHasSkillAssessment === false ? "default" : "outline"}
                  onClick={() => setAssessmentData({...assessmentData, partnerHasSkillAssessment: false})}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderQuestion7 = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Do you have a Masters degree by research or a Doctorate degree from an Australian educational institution that included at least 2 academic years in a relevant field?</h3>
      <div className="space-y-2">
        <Button
          variant={assessmentData.hasMastersOrDoctorate === true ? "default" : "outline"}
          onClick={() => setAssessmentData({...assessmentData, hasMastersOrDoctorate: true})}
        >
          Yes
        </Button>
        <Button
          variant={assessmentData.hasMastersOrDoctorate === false ? "default" : "outline"}
          onClick={() => setAssessmentData({...assessmentData, hasMastersOrDoctorate: false})}
        >
          No
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span className="text-sm text-gray-500">{Math.round((currentQuestion / totalQuestions) * 100)}% Complete</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestion()}
        
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentQuestion === 1}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {currentQuestion === totalQuestions ? 'Calculate Results' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionStep;
