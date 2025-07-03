import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calculator, 
  Award, 
  TrendingUp, 
  Star,
  GraduationCap,
  Briefcase,
  Languages,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useState } from 'react';

interface VisaEligibilityDashboardProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export const VisaEligibilityDashboard = ({ formData, onInputChange }: VisaEligibilityDashboardProps) => {
  const [pointsBreakdown, setPointsBreakdown] = useState({
    age: 0,
    education: 0,
    experience: 0,
    english: 0,
    partner: 0,
    nomination: 0,
    regional: 0
  });

  const calculatePoints = () => {
    // Mock calculation - replace with real logic
    const total = Object.values(pointsBreakdown).reduce((sum, points) => sum + points, 0);
    return total;
  };

  const totalPoints = calculatePoints();
  const minPoints = formData.visa_type_interested === 'Student Visa' ? 65 : 65; // Simplified
  const eligibilityStatus = totalPoints >= minPoints ? 'eligible' : 'needs_improvement';

  const eligibilityChecks = [
    {
      category: 'Age Requirements',
      status: formData.age >= 18 && formData.age <= 44 ? 'pass' : 'fail',
      description: 'Must be between 18-44 years old',
      points: pointsBreakdown.age
    },
    {
      category: 'English Proficiency',
      status: formData.english_test_score ? 'pass' : 'pending',
      description: 'Valid IELTS/PTE/TOEFL scores required',
      points: pointsBreakdown.english
    },
    {
      category: 'Skills Assessment',
      status: formData.skills_assessment ? 'pass' : 'pending',
      description: 'Positive skills assessment for nominated occupation',
      points: 0
    },
    {
      category: 'Work Experience',
      status: formData.work_experience >= 3 ? 'pass' : 'pending',
      description: 'Minimum 3 years relevant work experience',
      points: pointsBreakdown.experience
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-confidence-purple" />
          <span>Visa Eligibility Dashboard</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Points Summary */}
          <div className="p-6 bg-gradient-to-r from-confidence-purple/10 to-trust-blue/10 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{totalPoints} Points</h3>
                <p className="text-muted-foreground">Current Immigration Points</p>
              </div>
              <div className="text-right">
                <Badge 
                  className={`${
                    eligibilityStatus === 'eligible' 
                      ? 'bg-success-green/10 text-success-green border-success-green/20'
                      : 'bg-action-orange/10 text-action-orange border-action-orange/20'
                  }`}
                >
                  {eligibilityStatus === 'eligible' ? 'Eligible' : 'Needs Improvement'}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">Minimum: {minPoints} pts</p>
              </div>
            </div>
            <Progress value={(totalPoints / 100) * 100} className="h-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {totalPoints >= minPoints 
                ? `You exceed the minimum by ${totalPoints - minPoints} points!`
                : `You need ${minPoints - totalPoints} more points to meet the minimum requirement`
              }
            </p>
          </div>

          {/* Points Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Age', value: pointsBreakdown.age, max: 30, icon: Users },
              { label: 'Education', value: pointsBreakdown.education, max: 20, icon: GraduationCap },
              { label: 'Experience', value: pointsBreakdown.experience, max: 20, icon: Briefcase },
              { label: 'English', value: pointsBreakdown.english, max: 20, icon: Languages },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-trust-blue" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}/{item.max}</span>
                  </div>
                  <Progress value={(item.value / item.max) * 100} className="h-2" />
                </div>
              );
            })}
          </div>

          {/* Eligibility Checklist */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success-green" />
              <span>Eligibility Requirements</span>
            </h4>
            
            {eligibilityChecks.map((check, index) => {
              const statusConfig = {
                pass: { icon: CheckCircle, color: 'text-success-green', bg: 'bg-success-green/10' },
                fail: { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' },
                pending: { icon: Info, color: 'text-action-orange', bg: 'bg-action-orange/10' }
              };
              
              const config = statusConfig[check.status];
              const Icon = config.icon;
              
              return (
                <div key={index} className={`p-3 rounded-lg border ${config.bg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-4 w-4 ${config.color}`} />
                      <div>
                        <p className="font-medium text-sm">{check.category}</p>
                        <p className="text-xs text-muted-foreground">{check.description}</p>
                      </div>
                    </div>
                    {check.points > 0 && (
                      <Badge variant="secondary">{check.points} pts</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Form Fields for Points Calculation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => {
                  onInputChange('age', e.target.value);
                  // Update points calculation
                  const age = parseInt(e.target.value);
                  let agePoints = 0;
                  if (age >= 25 && age <= 32) agePoints = 30;
                  else if (age >= 33 && age <= 39) agePoints = 25;
                  else if (age >= 18 && age <= 24) agePoints = 20;
                  setPointsBreakdown(prev => ({ ...prev, age: agePoints }));
                }}
                placeholder="Enter your age"
                min="18"
                max="65"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education_level">Education Level</Label>
              <Select
                value={formData.education_level || ''}
                onValueChange={(value) => {
                  onInputChange('education_level', value);
                  // Update points calculation
                  const eduPoints = {
                    'phd': 20,
                    'masters': 15,
                    'bachelors': 15,
                    'diploma': 10,
                    'certificate': 5
                  };
                  setPointsBreakdown(prev => ({ ...prev, education: eduPoints[value] || 0 }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phd">PhD/Doctorate</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="work_experience">Work Experience (Years)</Label>
              <Input
                id="work_experience"
                type="number"
                value={formData.work_experience || ''}
                onChange={(e) => {
                  onInputChange('work_experience', e.target.value);
                  // Update points calculation
                  const years = parseInt(e.target.value);
                  let expPoints = 0;
                  if (years >= 8) expPoints = 20;
                  else if (years >= 5) expPoints = 15;
                  else if (years >= 3) expPoints = 10;
                  else if (years >= 1) expPoints = 5;
                  setPointsBreakdown(prev => ({ ...prev, experience: expPoints }));
                }}
                placeholder="Years of experience"
                min="0"
                max="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="english_test_score">English Test Score</Label>
              <Input
                id="english_test_score"
                type="number"
                value={formData.english_test_score || ''}
                onChange={(e) => {
                  onInputChange('english_test_score', e.target.value);
                  // Update points calculation based on score
                  const score = parseFloat(e.target.value);
                  let engPoints = 0;
                  if (score >= 8) engPoints = 20;
                  else if (score >= 7) engPoints = 10;
                  else if (score >= 6) engPoints = 0;
                  setPointsBreakdown(prev => ({ ...prev, english: engPoints }));
                }}
                placeholder="IELTS overall score"
                step="0.5"
                min="0"
                max="9"
              />
            </div>
          </div>

          {/* Improvement Suggestions */}
          {eligibilityStatus === 'needs_improvement' && (
            <div className="p-4 bg-action-orange/10 border border-action-orange/20 rounded-lg">
              <h4 className="font-semibold text-action-orange mb-2 flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Improvement Suggestions</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Consider improving your English test scores for additional points</li>
                <li>• Gain more relevant work experience in your field</li>
                <li>• Explore regional nominations for extra points</li>
                <li>• Consider partner skills assessment if applicable</li>
              </ul>
            </div>
          )}

          <Button className="w-full bg-confidence-purple hover:bg-confidence-purple/90">
            <Calculator className="h-4 w-4 mr-2" />
            Get Detailed Points Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};