import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, CheckCircle, AlertCircle, TrendingUp, MapPin, Award, Clock } from 'lucide-react';

const VisaAssessment = () => {
  // Session-only state - no persistent storage
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    age: '',
    occupation: '',
    education: '',
    englishTest: '',
    englishScore: '',
    workExperienceAustralia: '',
    workExperienceOverseas: '',
    currentLocation: '',
    visaStatus: '',
    familyStatus: '',
    australianStudy: false,
    stateInterest: ''
  });
  const [pointsBreakdown, setPointsBreakdown] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  // Comprehensive occupation list
  const occupations = [
    { value: 'software-engineer', label: 'Software Engineer', list: 'MLTSSL', assessment: 'ACS' },
    { value: 'business-analyst', label: 'Business Analyst', list: 'MLTSSL', assessment: 'ACS' },
    { value: 'accountant', label: 'Accountant', list: 'MLTSSL', assessment: 'CPA/CA ANZ' },
    { value: 'mechanical-engineer', label: 'Mechanical Engineer', list: 'MLTSSL', assessment: 'Engineers Australia' },
    { value: 'civil-engineer', label: 'Civil Engineer', list: 'MLTSSL', assessment: 'Engineers Australia' },
    { value: 'registered-nurse', label: 'Registered Nurse', list: 'MLTSSL', assessment: 'ANMAC' },
    { value: 'teacher', label: 'Secondary School Teacher', list: 'MLTSSL', assessment: 'AITSL' },
    { value: 'chef', label: 'Chef', list: 'STSOL', assessment: 'TRA' },
    { value: 'marketing-specialist', label: 'Marketing Specialist', list: 'STSOL', assessment: 'VETASSESS' },
    { value: 'project-manager', label: 'Project Manager', list: 'STSOL', assessment: 'VETASSESS' }
  ];

  const calculatePoints = () => {
    let points = 0;
    const breakdown = {
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

    // English points
    const englishScore = parseFloat(assessmentData.englishScore);
    if (assessmentData.englishTest === 'ielts') {
      if (englishScore >= 8.0) breakdown.english = 20;
      else if (englishScore >= 7.0) breakdown.english = 10;
    } else if (assessmentData.englishTest === 'pte') {
      if (englishScore >= 79) breakdown.english = 20;
      else if (englishScore >= 65) breakdown.english = 10;
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

  const generateRecommendations = (points) => {
    const selectedOccupation = occupations.find(occ => occ.value === assessmentData.occupation);
    
    const recommendations = {
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
    if (points.english < 20 && parseFloat(assessmentData.englishScore) < 8.0) {
      recommendations.improvements.push({
        area: 'English Proficiency',
        current: `${points.english} points`,
        potential: '+10-20 points',
        action: 'Achieve IELTS 7.0+ (Proficient) or 8.0+ (Superior)'
      });
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

  const handleStepComplete = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final results - session only
      const points = calculatePoints();
      const recs = generateRecommendations(points);
      setPointsBreakdown(points);
      setRecommendations(recs);
    }
  };

  const getStepProgress = () => {
    return (currentStep / 4) * 100;
  };

  const validateAge = (value) => {
    const age = parseInt(value);
    return age >= 18; // Removed maximum age limit
  };

  const validateWorkExperience = (value) => {
    const years = parseInt(value) || 0;
    return years >= 0; // Removed maximum limit
  };

  if (pointsBreakdown && recommendations) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-australia-blue to-australia-darkBlue text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Assessment Results</h2>
                <p className="text-blue-100">Personalized visa guidance based on your profile</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{pointsBreakdown.total}</div>
                <div className="text-sm text-blue-200">Total Points</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Points Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Points Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Age ({assessmentData.age} years)</span>
                  <Badge variant={pointsBreakdown.age >= 25 ? "default" : "secondary"}>
                    {pointsBreakdown.age} points
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>English ({assessmentData.englishTest?.toUpperCase()} {assessmentData.englishScore})</span>
                  <Badge variant={pointsBreakdown.english >= 10 ? "default" : "secondary"}>
                    {pointsBreakdown.english} points
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Education</span>
                  <Badge variant={pointsBreakdown.education >= 15 ? "default" : "secondary"}>
                    {pointsBreakdown.education} points
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Overseas Work Experience ({assessmentData.workExperienceOverseas} years)</span>
                  <Badge variant={pointsBreakdown.experience >= 10 ? "default" : "secondary"}>
                    {pointsBreakdown.experience} points
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Australian Work Experience ({assessmentData.workExperienceAustralia} years)</span>
                  <Badge variant={pointsBreakdown.australianExperience >= 10 ? "default" : "secondary"}>
                    {pointsBreakdown.australianExperience} points
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bonus Points</span>
                  <Badge variant={pointsBreakdown.bonus > 0 ? "default" : "secondary"}>
                    {pointsBreakdown.bonus} points
                  </Badge>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Score</span>
                    <Badge className="bg-australia-blue text-white">
                      {pointsBreakdown.total} points
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visa Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recommended Visas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.eligible.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.eligible.map((visa, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{visa.visa}</h4>
                        <Badge 
                          variant={visa.chance === 'Excellent' ? 'default' : visa.chance === 'Good' ? 'secondary' : 'outline'}
                        >
                          {visa.chance}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{visa.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Currently not eligible for skilled migration visas</p>
                  <p className="text-sm text-gray-500 mt-1">Focus on improving your points score</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Strategy & Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Improvement Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.improvements.length > 0 ? (
                <div className="space-y-3">
                  {recommendations.improvements.map((improvement, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{improvement.area}</h4>
                        <span className="text-green-600 font-medium">{improvement.potential}</span>
                      </div>
                      <p className="text-sm text-gray-600">{improvement.action}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-600">Excellent profile! No major improvements needed.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-blue-900 mb-1">Strategy Recommendation</h4>
                  <p className="text-sm text-blue-800">{recommendations.strategy}</p>
                </div>
                <ol className="space-y-2">
                  {recommendations.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-australia-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => {
              setCurrentStep(1);
              setPointsBreakdown(null);
              setRecommendations(null);
              setAssessmentData({
                age: '',
                occupation: '',
                education: '',
                englishTest: '',
                englishScore: '',
                workExperienceAustralia: '',
                workExperienceOverseas: '',
                currentLocation: '',
                visaStatus: '',
                familyStatus: '',
                australianStudy: false,
                stateInterest: ''
              });
            }}
            variant="outline"
          >
            Start New Assessment
          </Button>
          <Button className="bg-australia-blue hover:bg-australia-darkBlue">
            Chat with Ritu for Guidance
          </Button>
        </div>
      </div>
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
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
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
          )}

          {/* Step 2: English Proficiency */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">English Proficiency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="englishTest">English Test Type</Label>
                    <Select onValueChange={(value) => setAssessmentData({...assessmentData, englishTest: value})}>
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
                  <div>
                    <Label htmlFor="englishScore">
                      {assessmentData.englishTest === 'ielts' ? 'Overall IELTS Score' : 
                       assessmentData.englishTest === 'pte' ? 'Overall PTE Score' : 'Overall Score'}
                    </Label>
                    <Input
                      id="englishScore"
                      type="number"
                      step="0.5"
                      placeholder={assessmentData.englishTest === 'ielts' ? '6.0' : '50'}
                      value={assessmentData.englishScore}
                      onChange={(e) => setAssessmentData({...assessmentData, englishScore: e.target.value})}
                    />
                  </div>
                </div>
                
                {assessmentData.englishTest && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2">Score Guidelines for {assessmentData.englishTest.toUpperCase()}:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Competent (0 points):</span>
                        <br />
                        {assessmentData.englishTest === 'ielts' ? '6.0 each band' : 
                         assessmentData.englishTest === 'pte' ? '50 each section' : '6.0 overall'}
                      </div>
                      <div>
                        <span className="font-medium">Proficient (+10 points):</span>
                        <br />
                        {assessmentData.englishTest === 'ielts' ? '7.0 each band' : 
                         assessmentData.englishTest === 'pte' ? '65 each section' : '7.0 overall'}
                      </div>
                      <div>
                        <span className="font-medium">Superior (+20 points):</span>
                        <br />
                        {assessmentData.englishTest === 'ielts' ? '8.0 each band' : 
                         assessmentData.englishTest === 'pte' ? '79 each section' : '8.0 overall'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Current Location</Label>
                    <Select onValueChange={(value) => setAssessmentData({...assessmentData, currentLocation: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="visaStatus">Current Visa Status (if in Australia)</Label>
                    <Select onValueChange={(value) => setAssessmentData({...assessmentData, visaStatus: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visa status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Not in Australia</SelectItem>
                        <SelectItem value="student">Student Visa</SelectItem>
                        <SelectItem value="temporary-graduate">Temporary Graduate Visa</SelectItem>
                        <SelectItem value="working-holiday">Working Holiday Visa</SelectItem>
                        <SelectItem value="work">Work Visa</SelectItem>
                        <SelectItem value="visitor">Visitor Visa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="family">Family Status</Label>
                    <Select onValueChange={(value) => setAssessmentData({...assessmentData, familyStatus: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select family status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married-included">Married (partner included in application)</SelectItem>
                        <SelectItem value="married-separate">Married (partner not included)</SelectItem>
                        <SelectItem value="defacto">De facto relationship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">Preferred Australian State</Label>
                    <Select onValueChange={(value) => setAssessmentData({...assessmentData, stateInterest: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nsw">New South Wales (Sydney)</SelectItem>
                        <SelectItem value="vic">Victoria (Melbourne)</SelectItem>
                        <SelectItem value="qld">Queensland (Brisbane)</SelectItem>
                        <SelectItem value="wa">Western Australia (Perth)</SelectItem>
                        <SelectItem value="sa">South Australia (Adelaide)</SelectItem>
                        <SelectItem value="tas">Tasmania (Hobart)</SelectItem>
                        <SelectItem value="act">Australian Capital Territory (Canberra)</SelectItem>
                        <SelectItem value="nt">Northern Territory (Darwin)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
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
                      <div>English: {assessmentData.englishTest?.toUpperCase()} {assessmentData.englishScore}</div>
                      <div>Location: {assessmentData.currentLocation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                (currentStep === 2 && (!assessmentData.englishTest || !assessmentData.englishScore)) ||
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
