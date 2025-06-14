
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Calculator, FileText, Globe } from 'lucide-react';

interface AssessmentData {
  age: string;
  education: string;
  experience: string;
  englishTest: string;
  englishScore: string;
  occupation: string;
  partnerSkills: string;
  australianStudy: string;
  communityLanguage: string;
  professionalYear: string;
}

const VisaAssessment = () => {
  const [step, setStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    age: '',
    education: '',
    experience: '',
    englishTest: '',
    englishScore: '',
    occupation: '',
    partnerSkills: '',
    australianStudy: '',
    communityLanguage: '',
    professionalYear: ''
  });
  const [results, setResults] = useState<any>(null);

  const calculatePoints = () => {
    let totalPoints = 0;
    let breakdown: any = {};

    // Age points
    const age = parseInt(assessmentData.age);
    if (age >= 25 && age <= 32) {
      breakdown.age = 30;
      totalPoints += 30;
    } else if (age >= 33 && age <= 39) {
      breakdown.age = 25;
      totalPoints += 25;
    } else if (age >= 40 && age <= 44) {
      breakdown.age = 15;
      totalPoints += 15;
    } else {
      breakdown.age = 0;
    }

    // Education points
    switch (assessmentData.education) {
      case 'doctorate':
        breakdown.education = 20;
        totalPoints += 20;
        break;
      case 'bachelor':
        breakdown.education = 15;
        totalPoints += 15;
        break;
      case 'diploma':
        breakdown.education = 10;
        totalPoints += 10;
        break;
      default:
        breakdown.education = 0;
    }

    // Experience points
    const experience = parseInt(assessmentData.experience);
    if (experience >= 8) {
      breakdown.experience = 20;
      totalPoints += 20;
    } else if (experience >= 5) {
      breakdown.experience = 15;
      totalPoints += 15;
    } else if (experience >= 3) {
      breakdown.experience = 10;
      totalPoints += 10;
    } else {
      breakdown.experience = 0;
    }

    // English points
    const englishScore = parseFloat(assessmentData.englishScore);
    if (assessmentData.englishTest === 'ielts') {
      if (englishScore >= 8.0) {
        breakdown.english = 20;
        totalPoints += 20;
      } else if (englishScore >= 7.0) {
        breakdown.english = 10;
        totalPoints += 10;
      } else {
        breakdown.english = 0;
      }
    }

    // Bonus points
    breakdown.bonus = 0;
    if (assessmentData.australianStudy === 'yes') {
      breakdown.bonus += 5;
      totalPoints += 5;
    }
    if (assessmentData.communityLanguage === 'yes') {
      breakdown.bonus += 5;
      totalPoints += 5;
    }
    if (assessmentData.professionalYear === 'yes') {
      breakdown.bonus += 5;
      totalPoints += 5;
    }
    if (assessmentData.partnerSkills === 'yes') {
      breakdown.bonus += 10;
      totalPoints += 10;
    }

    return { totalPoints, breakdown };
  };

  const handleSubmit = () => {
    const { totalPoints, breakdown } = calculatePoints();
    
    let eligibility = '';
    let recommendations = [];
    let visaOptions = [];

    if (totalPoints >= 80) {
      eligibility = 'Excellent';
      recommendations.push('You have a competitive score for skilled migration');
      recommendations.push('Consider applying for subclass 189 (Skilled Independent)');
      visaOptions.push({ visa: 'Subclass 189', chance: 'Very High', points: totalPoints });
      visaOptions.push({ visa: 'Subclass 190', chance: 'Very High', points: totalPoints + 5 });
    } else if (totalPoints >= 65) {
      eligibility = 'Good';
      recommendations.push('You meet the minimum points requirement');
      recommendations.push('State nomination (190) would improve your chances significantly');
      visaOptions.push({ visa: 'Subclass 190', chance: 'High', points: totalPoints + 5 });
      visaOptions.push({ visa: 'Subclass 491', chance: 'High', points: totalPoints + 15 });
    } else {
      eligibility = 'Needs Improvement';
      recommendations.push('Focus on improving your points score');
      recommendations.push('Consider improving English scores or gaining more experience');
      if (totalPoints >= 50) {
        visaOptions.push({ visa: 'Subclass 491', chance: 'Moderate', points: totalPoints + 15 });
      }
    }

    setResults({
      totalPoints,
      breakdown,
      eligibility,
      recommendations,
      visaOptions
    });
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={assessmentData.age}
                onChange={(e) => setAssessmentData({...assessmentData, age: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="education">Highest Education Level</Label>
              <Select value={assessmentData.education} onValueChange={(value) => setAssessmentData({...assessmentData, education: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctorate">Doctorate (PhD)</SelectItem>
                  <SelectItem value="bachelor">Bachelor's/Master's Degree</SelectItem>
                  <SelectItem value="diploma">Diploma/Certificate</SelectItem>
                  <SelectItem value="secondary">Secondary School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Years of Work Experience (in nominated occupation)</Label>
              <Input
                id="experience"
                type="number"
                placeholder="Years of experience"
                value={assessmentData.experience}
                onChange={(e) => setAssessmentData({...assessmentData, experience: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="englishTest">English Test Type</Label>
              <Select value={assessmentData.englishTest} onValueChange={(value) => setAssessmentData({...assessmentData, englishTest: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ielts">IELTS Academic</SelectItem>
                  <SelectItem value="pte">PTE Academic</SelectItem>
                  <SelectItem value="toefl">TOEFL iBT</SelectItem>
                  <SelectItem value="none">Not taken yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="englishScore">Overall Score (if taken)</Label>
              <Input
                id="englishScore"
                type="number"
                step="0.5"
                placeholder="e.g., 7.5 for IELTS"
                value={assessmentData.englishScore}
                onChange={(e) => setAssessmentData({...assessmentData, englishScore: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="occupation">Nominated Occupation</Label>
              <Input
                id="occupation"
                placeholder="e.g., Software Engineer, Accountant"
                value={assessmentData.occupation}
                onChange={(e) => setAssessmentData({...assessmentData, occupation: e.target.value})}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Do you have a skilled partner?</Label>
              <Select value={assessmentData.partnerSkills} onValueChange={(value) => setAssessmentData({...assessmentData, partnerSkills: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (+10 points)</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="single">Single</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Australian study (2+ years)?</Label>
              <Select value={assessmentData.australianStudy} onValueChange={(value) => setAssessmentData({...assessmentData, australianStudy: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (+5 points)</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Community language credentials?</Label>
              <Select value={assessmentData.communityLanguage} onValueChange={(value) => setAssessmentData({...assessmentData, communityLanguage: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (+5 points)</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Professional Year completed?</Label>
              <Select value={assessmentData.professionalYear} onValueChange={(value) => setAssessmentData({...assessmentData, professionalYear: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes (+5 points)</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            {results && (
              <>
                <div className="text-center">
                  <div className="text-4xl font-bold text-australia-blue mb-2">
                    {results.totalPoints} Points
                  </div>
                  <div className={`text-lg font-semibold ${
                    results.eligibility === 'Excellent' ? 'text-green-600' :
                    results.eligibility === 'Good' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {results.eligibility} Eligibility
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-australia-blue">{results.breakdown.age}</div>
                    <div className="text-sm text-gray-600">Age</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-australia-blue">{results.breakdown.education}</div>
                    <div className="text-sm text-gray-600">Education</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-australia-blue">{results.breakdown.experience}</div>
                    <div className="text-sm text-gray-600">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-australia-blue">{results.breakdown.english}</div>
                    <div className="text-sm text-gray-600">English</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-australia-blue">{results.breakdown.bonus}</div>
                    <div className="text-sm text-gray-600">Bonus</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Visa Options</h3>
                  <div className="space-y-3">
                    {results.visaOptions.map((option: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{option.visa}</div>
                          <div className="text-sm text-gray-600">{option.points} points with this visa</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          option.chance === 'Very High' ? 'bg-green-100 text-green-800' :
                          option.chance === 'High' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {option.chance}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Visa Eligibility Assessment
        </CardTitle>
        <Progress value={(step / 4) * 100} className="mt-2" />
        <p className="text-sm text-gray-600">Step {step} of 4</p>
      </CardHeader>
      
      <CardContent>
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          
          {step < 4 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              className="bg-australia-blue hover:bg-australia-darkBlue"
            >
              {step === 3 ? 'Calculate Results' : 'Next'}
            </Button>
          ) : (
            <Button 
              onClick={() => {
                setStep(1);
                setResults(null);
                setAssessmentData({
                  age: '',
                  education: '',
                  experience: '',
                  englishTest: '',
                  englishScore: '',
                  occupation: '',
                  partnerSkills: '',
                  australianStudy: '',
                  communityLanguage: '',
                  professionalYear: ''
                });
              }}
              variant="outline"
            >
              Start New Assessment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaAssessment;
