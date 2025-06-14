
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentData } from './types';
import { occupations } from './data';
import { ArrowLeft, ArrowRight, User, Globe, GraduationCap, Briefcase, Award, Heart, Users } from 'lucide-react';

interface QuestionStepProps {
  currentQuestion: number;
  totalQuestions: number;
  assessmentData: AssessmentData;
  setAssessmentData: React.Dispatch<React.SetStateAction<AssessmentData>>;
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
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                <User className="w-8 h-8" />
                What is your age?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label htmlFor="age" className="text-lg font-semibold text-gray-800">Age (minimum 18 years)</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={assessmentData.age}
                  onChange={(e) => setAssessmentData(prev => ({ ...prev, age: e.target.value }))}
                  className="text-lg p-4 border-2 border-gray-300 focus:border-blue-500 bg-white"
                  placeholder="Enter your age"
                />
                {assessmentData.age && parseInt(assessmentData.age) < 18 && (
                  <p className="text-red-600 font-semibold bg-red-50 p-3 rounded border border-red-200">
                    You must be at least 18 years old to apply for an Australian visa.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-800">
                <Globe className="w-8 h-8" />
                English Language Proficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  Which English test did you take?
                </Label>
                <Select value={assessmentData.englishTest} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, englishTest: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-green-500 bg-white">
                    <SelectValue placeholder="Select your English test" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="ielts" className="text-lg p-3 hover:bg-green-50">IELTS Academic</SelectItem>
                    <SelectItem value="pte" className="text-lg p-3 hover:bg-green-50">PTE Academic</SelectItem>
                    <SelectItem value="toefl" className="text-lg p-3 hover:bg-green-50">TOEFL iBT</SelectItem>
                    <SelectItem value="oet" className="text-lg p-3 hover:bg-green-50">OET</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {assessmentData.englishTest && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Listening</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.englishScores.listening}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        englishScores: { ...prev.englishScores, listening: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-green-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Reading</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.englishScores.reading}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        englishScores: { ...prev.englishScores, reading: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-green-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Writing</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.englishScores.writing}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        englishScores: { ...prev.englishScores, writing: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-green-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Speaking</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.englishScores.speaking}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        englishScores: { ...prev.englishScores, speaking: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-green-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="border-2 border-purple-200">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-purple-800">
                <GraduationCap className="w-8 h-8" />
                Education & Occupation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  What is your highest level of education?
                </Label>
                <Select value={assessmentData.education} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, education: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-purple-500 bg-white">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="doctorate" className="text-lg p-3 hover:bg-purple-50">Doctorate (PhD)</SelectItem>
                    <SelectItem value="masters" className="text-lg p-3 hover:bg-purple-50">Masters degree</SelectItem>
                    <SelectItem value="bachelor" className="text-lg p-3 hover:bg-purple-50">Bachelor degree</SelectItem>
                    <SelectItem value="diploma" className="text-lg p-3 hover:bg-purple-50">Diploma</SelectItem>
                    <SelectItem value="trade" className="text-lg p-3 hover:bg-purple-50">Trade qualification</SelectItem>
                    <SelectItem value="other" className="text-lg p-3 hover:bg-purple-50">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  What is your occupation?
                </Label>
                <Select value={assessmentData.occupation} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, occupation: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-purple-500 bg-white">
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300 max-h-60">
                    {occupations.map((occupation) => (
                      <SelectItem 
                        key={occupation.value} 
                        value={occupation.value}
                        className="text-base p-3 hover:bg-purple-50"
                      >
                        {occupation.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-800">
                <Briefcase className="w-8 h-8" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  Years of overseas work experience (in your nominated occupation)
                </Label>
                <Select value={assessmentData.workExperienceOverseas} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, workExperienceOverseas: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-orange-500 bg-white">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="0" className="text-lg p-3 hover:bg-orange-50">0 years</SelectItem>
                    <SelectItem value="1-2" className="text-lg p-3 hover:bg-orange-50">1-2 years</SelectItem>
                    <SelectItem value="3-4" className="text-lg p-3 hover:bg-orange-50">3-4 years</SelectItem>
                    <SelectItem value="5-7" className="text-lg p-3 hover:bg-orange-50">5-7 years</SelectItem>
                    <SelectItem value="8+" className="text-lg p-3 hover:bg-orange-50">8+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  Years of Australian work experience (in your nominated occupation)
                </Label>
                <Select value={assessmentData.workExperienceAustralia} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, workExperienceAustralia: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-orange-500 bg-white">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="0" className="text-lg p-3 hover:bg-orange-50">0 years</SelectItem>
                    <SelectItem value="1" className="text-lg p-3 hover:bg-orange-50">1 year</SelectItem>
                    <SelectItem value="2" className="text-lg p-3 hover:bg-orange-50">2 years</SelectItem>
                    <SelectItem value="3" className="text-lg p-3 hover:bg-orange-50">3 years</SelectItem>
                    <SelectItem value="5" className="text-lg p-3 hover:bg-orange-50">5 years</SelectItem>
                    <SelectItem value="8" className="text-lg p-3 hover:bg-orange-50">8+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="border-2 border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-800">
                <Award className="w-8 h-8" />
                Australian Study Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Do you have at least 1 degree, diploma or trade qualification from an Australian educational institution that took at least 2 academic years to complete?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.hasAustralianQualification === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasAustralianQualification: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.hasAustralianQualification === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasAustralianQualification: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 6:
        return (
          <Card className="border-2 border-teal-200">
            <CardHeader className="bg-teal-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-teal-800">
                <Award className="w-8 h-8" />
                Regional Australia Study & Masters/PhD
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Was your Australian qualification completed in regional Australia?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.isFromRegionalAustralia === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, isFromRegionalAustralia: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.isFromRegionalAustralia === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, isFromRegionalAustralia: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 7:
        return (
          <Card className="border-2 border-indigo-200">
            <CardHeader className="bg-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-indigo-800">
                <Award className="w-8 h-8" />
                Masters/Doctorate Qualification
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Do you have a Masters degree by research or a Doctorate degree from an Australian educational institution in a relevant field?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.hasMastersOrDoctorate === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasMastersOrDoctorate: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.hasMastersOrDoctorate === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasMastersOrDoctorate: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 8:
        return (
          <Card className="border-2 border-pink-200">
            <CardHeader className="bg-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-pink-800">
                <Award className="w-8 h-8" />
                NAATI Credential
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Do you have a community language credential for interpreting or translating by NAATI?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.hasNAATICredential === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasNAATICredential: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.hasNAATICredential === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasNAATICredential: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 9:
        return (
          <Card className="border-2 border-emerald-200">
            <CardHeader className="bg-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-emerald-800">
                <Award className="w-8 h-8" />
                Professional Year
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Did you complete a professional year in Australia in your nominated occupation or related field?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.hasCompletedProfessionalYear === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasCompletedProfessionalYear: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.hasCompletedProfessionalYear === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, hasCompletedProfessionalYear: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 10:
        return (
          <Card className="border-2 border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-red-800">
                <Heart className="w-8 h-8" />
                Partner Status
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  What is your relationship status?
                </Label>
                <div className="grid grid-cols-1 gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.partnerStatus === 'single' ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, partnerStatus: 'single' }))}
                    className="text-lg p-4 border-2 hover:scale-105 transition-all justify-start"
                  >
                    Single / No partner
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.partnerStatus === 'australian' ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, partnerStatus: 'australian' }))}
                    className="text-lg p-4 border-2 hover:scale-105 transition-all justify-start"
                  >
                    Partner is Australian citizen or permanent resident
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.partnerStatus === 'non-australian' ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, partnerStatus: 'non-australian' }))}
                    className="text-lg p-4 border-2 hover:scale-105 transition-all justify-start"
                  >
                    Partner is not Australian citizen or permanent resident
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 11:
        return (
          <Card className="border-2 border-violet-200">
            <CardHeader className="bg-violet-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-violet-800">
                <Users className="w-8 h-8" />
                Partner Skills Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                  Partner's English test
                </Label>
                <Select value={assessmentData.partnerEnglishTest} onValueChange={(value) => 
                  setAssessmentData(prev => ({ ...prev, partnerEnglishTest: value }))
                }>
                  <SelectTrigger className="text-lg p-4 border-2 border-gray-300 focus:border-violet-500 bg-white">
                    <SelectValue placeholder="Select partner's English test" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="ielts" className="text-lg p-3 hover:bg-violet-50">IELTS Academic</SelectItem>
                    <SelectItem value="pte" className="text-lg p-3 hover:bg-violet-50">PTE Academic</SelectItem>
                    <SelectItem value="toefl" className="text-lg p-3 hover:bg-violet-50">TOEFL iBT</SelectItem>
                    <SelectItem value="oet" className="text-lg p-3 hover:bg-violet-50">OET</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {assessmentData.partnerEnglishTest && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Listening</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.partnerEnglishScores.listening}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        partnerEnglishScores: { ...prev.partnerEnglishScores, listening: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-violet-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Reading</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.partnerEnglishScores.reading}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        partnerEnglishScores: { ...prev.partnerEnglishScores, reading: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-violet-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Writing</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.partnerEnglishScores.writing}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        partnerEnglishScores: { ...prev.partnerEnglishScores, writing: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-violet-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold text-gray-800 mb-2 block">Speaking</Label>
                    <Input
                      type="number"
                      step="0.5"
                      value={assessmentData.partnerEnglishScores.speaking}
                      onChange={(e) => setAssessmentData(prev => ({
                        ...prev,
                        partnerEnglishScores: { ...prev.partnerEnglishScores, speaking: e.target.value }
                      }))}
                      className="text-lg p-3 border-2 border-gray-300 focus:border-violet-500 bg-white"
                      placeholder="Score"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800 block">
                  Does your partner have a positive skills assessment in an occupation on the same skilled occupation list as your nominated occupation?
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={assessmentData.partnerHasSkillAssessment === true ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, partnerHasSkillAssessment: true }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={assessmentData.partnerHasSkillAssessment === false ? "default" : "outline"}
                    onClick={() => setAssessmentData(prev => ({ ...prev, partnerHasSkillAssessment: false }))}
                    className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all"
                  >
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      {renderQuestion()}
      
      {/* Navigation Buttons with Enhanced Styling */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={onPrevious}
          disabled={currentQuestion === 1}
          variant="outline"
          size="lg"
          className="text-lg px-8 py-4 border-2 border-gray-300 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-600 hover:border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === totalQuestions ? 'Get Results' : 'Next'}
          {currentQuestion !== totalQuestions && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default QuestionStep;
