import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  MapPin, 
  Target, 
  Award, 
  Plane,
  ChevronRight,
  Star
} from 'lucide-react';

interface ProgressTimelineProps {
  activeCase: any;
  journeyProgress: { progress: number; stage: string };
}

export const ProgressTimeline = ({ activeCase, journeyProgress }: ProgressTimelineProps) => {
  const timelineSteps = [
    {
      id: 1,
      title: "Initial Assessment",
      description: "Evaluate eligibility and pathway options",
      status: "completed",
      icon: CheckCircle,
      estimatedDays: 7,
      actualDays: 5,
      celebrationBadge: "✨ Fast Start!"
    },
    {
      id: 2,
      title: "Document Collection",
      description: "Gather and verify required documents",
      status: journeyProgress.progress >= 35 ? "completed" : journeyProgress.progress >= 15 ? "current" : "pending",
      icon: journeyProgress.progress >= 35 ? CheckCircle : journeyProgress.progress >= 15 ? Clock : Circle,
      estimatedDays: 30,
      actualDays: journeyProgress.progress >= 35 ? 28 : undefined,
      celebrationBadge: journeyProgress.progress >= 35 ? "🏆 Excellent Organization!" : undefined
    },
    {
      id: 3,
      title: "Application Preparation",
      description: "Prepare and review complete application",
      status: journeyProgress.progress >= 65 ? "completed" : journeyProgress.progress >= 35 ? "current" : "pending",
      icon: journeyProgress.progress >= 65 ? CheckCircle : journeyProgress.progress >= 35 ? Clock : Circle,
      estimatedDays: 14,
      actualDays: undefined
    },
    {
      id: 4,
      title: "Government Submission",
      description: "Submit application to Department of Home Affairs",
      status: journeyProgress.progress >= 80 ? "completed" : journeyProgress.progress >= 65 ? "current" : "pending",
      icon: journeyProgress.progress >= 80 ? CheckCircle : journeyProgress.progress >= 65 ? Target : Circle,
      estimatedDays: 1,
      actualDays: undefined
    },
    {
      id: 5,
      title: "Assessment & Decision",
      description: "Government processing and decision",
      status: journeyProgress.progress >= 90 ? "completed" : journeyProgress.progress >= 80 ? "current" : "pending",
      icon: journeyProgress.progress >= 90 ? CheckCircle : journeyProgress.progress >= 80 ? Clock : Circle,
      estimatedDays: 120,
      actualDays: undefined,
      note: "Average processing time: 8-12 months"
    },
    {
      id: 6,
      title: "Welcome to Australia!",
      description: "Visa granted - begin your new journey",
      status: journeyProgress.progress === 100 ? "completed" : "pending",
      icon: journeyProgress.progress === 100 ? Award : Plane,
      estimatedDays: 0,
      actualDays: undefined,
      celebrationBadge: journeyProgress.progress === 100 ? "🇦🇺 Welcome Home!" : "🎯 Almost There!"
    }
  ];

  const currentStep = timelineSteps.find(step => step.status === "current");
  const completedSteps = timelineSteps.filter(step => step.status === "completed").length;
  const totalSteps = timelineSteps.length;

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-trust-blue to-confidence-purple text-white">
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Your Australian Immigration Journey</span>
        </CardTitle>
        <div className="flex items-center justify-between mt-4">
          <div>
            <Badge className="bg-white/20 text-white border-white/30">
              Step {completedSteps + 1} of {totalSteps}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/90">Overall Progress</p>
            <p className="text-xl font-bold text-white">{journeyProgress.progress}%</p>
          </div>
        </div>
        <Progress value={journeyProgress.progress} className="mt-3 h-2 bg-white/20" />
      </CardHeader>
      <CardContent className="p-0">
        {activeCase ? (
          <div className="p-6">
            {/* Case Summary */}
            <div className="mb-6 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{activeCase.case_number}</h3>
                  <p className="text-muted-foreground capitalize">
                    {activeCase.case_type?.replace('_', ' ')} Application
                  </p>
                </div>
                <Badge 
                  className={
                    activeCase.status === 'approved' ? 'bg-success-green text-white' :
                    activeCase.status === 'submitted' || activeCase.status === 'awaiting_response' ? 'bg-action-orange text-white' :
                    'bg-trust-blue text-white'
                  }
                >
                  {activeCase.status?.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            {/* Current Focus */}
            {currentStep && (
              <div className="mb-6 p-4 border-2 border-trust-blue/20 bg-trust-blue/5 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-trust-blue/10 rounded-full">
                    <Clock className="h-4 w-4 text-trust-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-trust-blue">Current Focus</h4>
                    <p className="text-sm text-muted-foreground">{currentStep.title}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-9">
                  {currentStep.description}
                </p>
                {currentStep.estimatedDays && (
                  <p className="text-xs text-muted-foreground ml-9 mt-1">
                    Estimated: {currentStep.estimatedDays} days
                  </p>
                )}
              </div>
            )}

            {/* Timeline Steps */}
            <div className="space-y-4">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === timelineSteps.length - 1;
                
                return (
                  <div key={step.id} className="flex items-start space-x-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={`p-3 rounded-full border-2 ${
                        step.status === 'completed' ? 'bg-success-green border-success-green text-white' :
                        step.status === 'current' ? 'bg-trust-blue border-trust-blue text-white' :
                        'bg-muted border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-12 mt-2 ${
                          step.status === 'completed' ? 'bg-success-green' :
                          step.status === 'current' ? 'bg-gradient-to-b from-trust-blue to-muted' :
                          'bg-muted'
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-semibold ${
                          step.status === 'completed' ? 'text-success-green' :
                          step.status === 'current' ? 'text-trust-blue' :
                          'text-muted-foreground'
                        }`}>
                          {step.title}
                        </h4>
                        
                        {step.celebrationBadge && step.status === 'completed' && (
                          <Badge className="bg-success-green/10 text-success-green border-success-green/20">
                            {step.celebrationBadge}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      
                      {step.note && (
                        <p className="text-xs text-action-orange font-medium">
                          {step.note}
                        </p>
                      )}
                      
                      {step.actualDays && (
                        <div className="flex items-center space-x-4 mt-2 text-xs">
                          <span className="text-muted-foreground">
                            Estimated: {step.estimatedDays} days
                          </span>
                          <span className="text-success-green font-medium">
                            Actual: {step.actualDays} days
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t">
              <Link to="/dashboard/cases">
                <Button className="w-full bg-gradient-to-r from-trust-blue to-confidence-purple hover:from-trust-blue/90 hover:to-confidence-purple/90">
                  View Detailed Case Information
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center">
              <Plane className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start Your Journey?</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Take the first step towards your Australian immigration dream. 
                Our expert team will guide you through every step of the process.
              </p>
              <Button className="bg-gradient-to-r from-trust-blue to-confidence-purple hover:from-trust-blue/90 hover:to-confidence-purple/90">
                <Star className="mr-2 h-4 w-4" />
                Start Your Application
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};