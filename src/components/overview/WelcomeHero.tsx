import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Bell,
  Star,
  Sparkles
} from 'lucide-react';

interface WelcomeHeroProps {
  client: any;
  user: any;
  journeyProgress: { progress: number; stage: string };
  userName: string;
}

export const WelcomeHero = ({ client, user, journeyProgress, userName }: WelcomeHeroProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getMotivationalMessage = () => {
    if (journeyProgress.progress === 100) return "Congratulations! Your Australian dream has come true! 🎉";
    if (journeyProgress.progress >= 80) return "You're so close to achieving your Australian dream! 🌟";
    if (journeyProgress.progress >= 50) return "Great progress on your immigration journey! 🚀";
    if (journeyProgress.progress >= 25) return "You're making excellent progress! Keep it up! 💪";
    return "Your Australian adventure begins here! 🇦🇺";
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-trust-blue/10 via-background to-success-green/10 rounded-2xl p-8 mb-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-trust-blue/20 to-transparent rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-success-green/20 to-transparent rounded-full -ml-24 -mb-24"></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-confidence-purple/10 to-transparent rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            {/* Main greeting */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-trust-blue to-success-green rounded-xl flex items-center justify-center">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {getGreeting()}, {userName}! 
                  <span className="inline-block ml-2 animate-float">🇦🇺</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  {getMotivationalMessage()}
                </p>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-trust-blue/10 text-trust-blue border-trust-blue/20 px-3 py-1">
                <MapPin className="h-3 w-3 mr-1" />
                {journeyProgress.stage}
              </Badge>
              <Badge className="bg-success-green/10 text-success-green border-success-green/20 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                {journeyProgress.progress}% Complete
              </Badge>
              <Badge className="bg-confidence-purple/10 text-confidence-purple border-confidence-purple/20 px-3 py-1">
                <Calendar className="h-3 w-3 mr-1" />
                Next milestone approaching
              </Badge>
            </div>

            {/* Key message */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Today's Focus:</strong> {
                  journeyProgress.progress < 25 ? "Complete your profile and upload initial documents" :
                  journeyProgress.progress < 50 ? "Review document requirements and prepare missing items" :
                  journeyProgress.progress < 75 ? "Application preparation and final document verification" :
                  journeyProgress.progress < 100 ? "Application submitted - track progress and respond to requests" :
                  "Congratulations! Prepare for your new life in Australia"
                }
              </p>
              {journeyProgress.progress < 100 && (
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-trust-blue hover:bg-trust-blue/90 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Take Action
                  </Button>
                  <Button size="sm" variant="outline" className="border-trust-blue/20 text-trust-blue hover:bg-trust-blue/5">
                    <Bell className="h-3 w-3 mr-1" />
                    Set Reminder
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Progress visualization */}
          <div className="lg:ml-8 mt-6 lg:mt-0">
            <div className="relative w-32 h-32 mx-auto">
              {/* Progress circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  fill="none"
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(journeyProgress.progress / 100) * 283} 283`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(37, 99, 235)" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{journeyProgress.progress}%</span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};