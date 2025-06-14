import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Lightbulb,
  BarChart3,
  Clock,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface PointsProfile {
  age: string;
  education: string;
  englishTest: string;
  englishScore: string;
  workExperience: string;
  spousePoints: string;
  australianStudy: boolean;
  australianWorkExp: string;
  communityLanguage: boolean;
  professionalYear: boolean;
  partnerSkills: string;
  spouseEnglish: string;
  regionStudy: boolean;
}

interface PointsBreakdown {
  age: number;
  education: number;
  english: number;
  workExperience: number;
  spousePoints: number;
  other: number;
  total: number;
}

interface Scenario {
  name: string;
  description: string;
  changes: Partial<PointsProfile>;
  pointsGain: number;
  timeframe: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const EnhancedPointsCalculator = () => {
  const [profile, setProfile] = useState<PointsProfile>({
    age: '',
    education: '',
    englishTest: '',
    englishScore: '',
    workExperience: '',
    spousePoints: '',
    australianStudy: false,
    australianWorkExp: '',
    communityLanguage: false,
    professionalYear: false,
    partnerSkills: '',
    spouseEnglish: '',
    regionStudy: false
  });

  const [currentPoints, setCurrentPoints] = useState<PointsBreakdown>({
    age: 0,
    education: 0,
    english: 0,
    workExperience: 0,
    spousePoints: 0,
    other: 0,
    total: 0
  });

  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const calculatePoints = (profileData: PointsProfile): PointsBreakdown => {
    const breakdown: PointsBreakdown = {
      age: 0,
      education: 0,
      english: 0,
      workExperience: 0,
      spousePoints: 0,
      other: 0,
      total: 0
    };

    // Age points
    const age = parseInt(profileData.age);
    if (age >= 18 && age <= 24) breakdown.age = 25;
    else if (age >= 25 && age <= 32) breakdown.age = 30;
    else if (age >= 33 && age <= 39) breakdown.age = 25;
    else if (age >= 40 && age <= 44) breakdown.age = 15;

    // Education points
    switch (profileData.education) {
      case 'doctorate': breakdown.education = 20; break;
      case 'masters': breakdown.education = 15; break;
      case 'bachelor': breakdown.education = 15; break;
      case 'diploma': breakdown.education = 10; break;
      case 'trade': breakdown.education = 10; break;
    }

    // English points
    const englishScore = parseFloat(profileData.englishScore);
    if (profileData.englishTest === 'ielts') {
      if (englishScore >= 8.0) breakdown.english = 20;
      else if (englishScore >= 7.0) breakdown.english = 10;
      else if (englishScore >= 6.0) breakdown.english = 0;
    } else if (profileData.englishTest === 'pte') {
      if (englishScore >= 79) breakdown.english = 20;
      else if (englishScore >= 65) breakdown.english = 10;
      else if (englishScore >= 50) breakdown.english = 0;
    }

    // Work experience points
    const experience = parseInt(profileData.workExperience);
    if (experience >= 8) breakdown.workExperience = 15;
    else if (experience >= 5) breakdown.workExperience = 10;
    else if (experience >= 3) breakdown.workExperience = 5;

    // Spouse/partner points
    if (profileData.spousePoints === 'none') breakdown.spousePoints = 10;
    else if (profileData.partnerSkills === 'skilled') breakdown.spousePoints = 10;
    else if (profileData.spouseEnglish === 'competent') breakdown.spousePoints = 5;

    // Other points
    if (profileData.australianStudy) breakdown.other += 5;
    if (profileData.professionalYear) breakdown.other += 5;
    if (profileData.communityLanguage) breakdown.other += 5;
    if (profileData.regionStudy) breakdown.other += 5;
    if (parseInt(profileData.australianWorkExp) >= 1) breakdown.other += 5;

    breakdown.total = breakdown.age + breakdown.education + breakdown.english + 
                    breakdown.workExperience + breakdown.spousePoints + breakdown.other;

    return breakdown;
  };

  const generateScenarios = (currentProfile: PointsProfile): Scenario[] => {
    const scenarios: Scenario[] = [];
    const currentTotal = calculatePoints(currentProfile).total;

    // English improvement scenarios
    if (currentProfile.englishTest && parseFloat(currentProfile.englishScore) < 8.0) {
      const improvedProfile = { ...currentProfile };
      if (currentProfile.englishTest === 'ielts') {
        improvedProfile.englishScore = '8.0';
      } else if (currentProfile.englishTest === 'pte') {
        improvedProfile.englishScore = '79';
      }
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Improve English to Superior',
        description: `Achieve ${currentProfile.englishTest === 'ielts' ? 'IELTS 8.0' : 'PTE 79'} across all components`,
        changes: { englishScore: improvedProfile.englishScore },
        pointsGain: newTotal - currentTotal,
        timeframe: '2-6 months',
        difficulty: 'Medium'
      });
    }

    // Work experience scenario
    if (parseInt(currentProfile.workExperience) < 8) {
      const experienceNeeded = Math.min(8, parseInt(currentProfile.workExperience) + 2);
      const improvedProfile = { ...currentProfile, workExperience: experienceNeeded.toString() };
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Gain More Work Experience',
        description: `Increase work experience to ${experienceNeeded} years`,
        changes: { workExperience: experienceNeeded.toString() },
        pointsGain: newTotal - currentTotal,
        timeframe: '1-2 years',
        difficulty: 'Hard'
      });
    }

    // Australian study scenario
    if (!currentProfile.australianStudy) {
      const improvedProfile = { ...currentProfile, australianStudy: true };
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Complete Australian Study',
        description: 'Complete 2+ years of Australian education',
        changes: { australianStudy: true },
        pointsGain: newTotal - currentTotal,
        timeframe: '2+ years',
        difficulty: 'Hard'
      });
    }

    // Professional Year scenario
    if (!currentProfile.professionalYear) {
      const improvedProfile = { ...currentProfile, professionalYear: true };
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Complete Professional Year',
        description: 'Complete Professional Year program in Australia',
        changes: { professionalYear: true },
        pointsGain: newTotal - currentTotal,
        timeframe: '12 months',
        difficulty: 'Medium'
      });
    }

    // Community language scenario
    if (!currentProfile.communityLanguage) {
      const improvedProfile = { ...currentProfile, communityLanguage: true };
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Learn Community Language',
        description: 'Achieve credentialed community language qualification',
        changes: { communityLanguage: true },
        pointsGain: newTotal - currentTotal,
        timeframe: '6-12 months',
        difficulty: 'Medium'
      });
    }

    // Partner scenarios
    if (currentProfile.spousePoints !== 'none' && currentProfile.partnerSkills !== 'skilled') {
      const improvedProfile = { ...currentProfile, partnerSkills: 'skilled' };
      const newTotal = calculatePoints(improvedProfile).total;
      
      scenarios.push({
        name: 'Partner Skills Assessment',
        description: 'Partner obtains positive skills assessment',
        changes: { partnerSkills: 'skilled' },
        pointsGain: newTotal - currentTotal,
        timeframe: '3-6 months',
        difficulty: 'Medium'
      });
    }

    return scenarios.filter(s => s.pointsGain > 0).sort((a, b) => b.pointsGain - a.pointsGain);
  };

  useEffect(() => {
    const points = calculatePoints(profile);
    setCurrentPoints(points);
    setScenarios(generateScenarios(profile));
  }, [profile]);

  const getEligibilityStatus = (points: number) => {
    if (points >= 85) return { status: 'Excellent', color: 'bg-green-500', description: 'Very competitive for most visa types' };
    if (points >= 75) return { status: 'Good', color: 'bg-blue-500', description: 'Competitive for state nomination' };
    if (points >= 65) return { status: 'Eligible', color: 'bg-yellow-500', description: 'Meets minimum requirements' };
    return { status: 'Below Threshold', color: 'bg-red-500', description: 'Need to improve points' };
  };

  const eligibility = getEligibilityStatus(currentPoints.total);

  const invitationData = [
    { round: 'Jan 2024', cutoff: 85, invitations: 1000 },
    { round: 'Feb 2024', cutoff: 80, invitations: 1200 },
    { round: 'Mar 2024', cutoff: 85, invitations: 800 },
    { round: 'Apr 2024', cutoff: 90, invitations: 600 },
    { round: 'May 2024', cutoff: 85, invitations: 1100 }
  ];

  const updateProfile = (field: keyof PointsProfile, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Enhanced Points Calculator</h2>
              <p className="text-purple-100">Advanced scoring with improvement strategies</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentPoints.total}</div>
              <div className="text-sm text-purple-200">Total Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="history">Invitation Rounds</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Age</Label>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      value={profile.age}
                      onChange={(e) => updateProfile('age', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Education</Label>
                    <Select onValueChange={(value) => updateProfile('education', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doctorate">Doctorate (PhD)</SelectItem>
                        <SelectItem value="masters">Masters Degree</SelectItem>
                        <SelectItem value="bachelor">Bachelor Degree</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="trade">Trade Qualification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>English Test</Label>
                    <Select onValueChange={(value) => updateProfile('englishTest', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ielts">IELTS</SelectItem>
                        <SelectItem value="pte">PTE</SelectItem>
                        <SelectItem value="toefl">TOEFL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>English Score</Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="Overall score"
                      value={profile.englishScore}
                      onChange={(e) => updateProfile('englishScore', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Work Experience (years)</Label>
                    <Input
                      type="number"
                      placeholder="Years of experience"
                      value={profile.workExperience}
                      onChange={(e) => updateProfile('workExperience', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Spouse/Partner</Label>
                    <Select onValueChange={(value) => updateProfile('spousePoints', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No spouse/partner</SelectItem>
                        <SelectItem value="spouse">Have spouse/partner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Additional Qualifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.australianStudy}
                        onChange={(e) => updateProfile('australianStudy', e.target.checked)}
                      />
                      <span className="text-sm">Australian study (2+ years)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.professionalYear}
                        onChange={(e) => updateProfile('professionalYear', e.target.checked)}
                      />
                      <span className="text-sm">Professional Year</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.communityLanguage}
                        onChange={(e) => updateProfile('communityLanguage', e.target.checked)}
                      />
                      <span className="text-sm">Community Language</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={profile.regionStudy}
                        onChange={(e) => updateProfile('regionStudy', e.target.checked)}
                      />
                      <span className="text-sm">Regional study</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Points Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${eligibility.color}`}>
                    {eligibility.status}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{eligibility.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Age ({profile.age} years)</span>
                    <Badge variant={currentPoints.age >= 25 ? "default" : "secondary"}>
                      {currentPoints.age} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Education</span>
                    <Badge variant={currentPoints.education >= 15 ? "default" : "secondary"}>
                      {currentPoints.education} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>English ({profile.englishTest?.toUpperCase()} {profile.englishScore})</span>
                    <Badge variant={currentPoints.english >= 10 ? "default" : "secondary"}>
                      {currentPoints.english} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Work Experience</span>
                    <Badge variant={currentPoints.workExperience >= 10 ? "default" : "secondary"}>
                      {currentPoints.workExperience} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Spouse/Partner</span>
                    <Badge variant={currentPoints.spousePoints > 0 ? "default" : "secondary"}>
                      {currentPoints.spousePoints} pts
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other Qualifications</span>
                    <Badge variant={currentPoints.other > 0 ? "default" : "secondary"}>
                      {currentPoints.other} pts
                    </Badge>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total Score</span>
                      <Badge className="bg-purple-600 text-white text-lg px-4 py-1">
                        {currentPoints.total} pts
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                What-If Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scenarios.length > 0 ? (
                <div className="space-y-4">
                  {scenarios.map((scenario, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{scenario.name}</h4>
                          <p className="text-sm text-gray-600">{scenario.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="mb-1">
                            +{scenario.pointsGain} points
                          </Badge>
                          <div className="text-xs text-gray-500">{scenario.timeframe}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <Badge 
                          variant={scenario.difficulty === 'Easy' ? 'default' : 
                                  scenario.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                        >
                          {scenario.difficulty}
                        </Badge>
                        <div className="text-gray-600">
                          New total: {currentPoints.total + scenario.pointsGain} points
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-600">Great! You've maximized most point categories.</p>
                  <p className="text-sm text-gray-500">Consider state nomination for additional points.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Optimization Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentPoints.english < 20 && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <h4 className="font-medium text-blue-900">English Improvement</h4>
                      <p className="text-sm text-blue-800">
                        Achieving superior English (IELTS 8.0/PTE 79) adds 10-20 points and significantly improves invitation chances.
                      </p>
                    </div>
                  )}
                  {currentPoints.age < 30 && parseInt(profile.age) > 32 && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-3">
                      <h4 className="font-medium text-amber-900">Age Factor</h4>
                      <p className="text-sm text-amber-800">
                        Points decrease with age. Apply as soon as you meet requirements to maximize age points.
                      </p>
                    </div>
                  )}
                  {!profile.australianStudy && !profile.professionalYear && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <h4 className="font-medium text-green-900">Australian Experience</h4>
                      <p className="text-sm text-green-800">
                        Consider Professional Year program for 5 points and improved employability.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Competitive Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-gray-50 border rounded p-3">
                    <h4 className="font-medium">Recent Invitation Trends</h4>
                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                      <li>• Average cutoff: 85 points</li>
                      <li>• Peak demand occupations: 90+ points</li>
                      <li>• State nomination: 70-80 points typical</li>
                      <li>• Regional visas: 65-75 points</li>
                    </ul>
                  </div>
                  <div className="text-center">
                    <Progress value={(currentPoints.total / 100) * 100} className="h-2 mb-2" />
                    <p className="text-sm text-gray-600">
                      You're at {Math.round((currentPoints.total / 100) * 100)}% of maximum possible points
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Invitation Rounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invitationData.map((round, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <span className="font-medium">{round.round}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        {round.invitations} invitations
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={currentPoints.total >= round.cutoff ? "default" : "secondary"}
                      >
                        {round.cutoff} points cutoff
                      </Badge>
                      {currentPoints.total >= round.cutoff ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Cutoff scores vary by occupation and can change between rounds. 
                  Higher points generally result in faster invitations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedPointsCalculator;
