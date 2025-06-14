
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, CheckCircle, AlertCircle, TrendingUp, Award, Clock } from 'lucide-react';
import { PointsBreakdown, Recommendations, AssessmentData } from './types';
import { getEnglishScoreDisplay } from './utils';

interface ResultsDisplayProps {
  pointsBreakdown: PointsBreakdown;
  recommendations: Recommendations;
  assessmentData: AssessmentData;
  onStartNew: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  pointsBreakdown, 
  recommendations, 
  assessmentData, 
  onStartNew 
}) => {
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
                <span>English ({assessmentData.englishTest?.toUpperCase()} {getEnglishScoreDisplay(assessmentData.englishScores)})</span>
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
        <Button onClick={onStartNew} variant="outline">
          Start New Assessment
        </Button>
        <Button className="bg-australia-blue hover:bg-australia-darkBlue">
          Chat with Ritu for Guidance
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
