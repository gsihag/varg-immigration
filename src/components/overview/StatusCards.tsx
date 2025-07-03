import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Shield, 
  DollarSign,
  Clock,
  CheckCircle,
  Upload
} from 'lucide-react';

interface StatusCardsProps {
  activeCase: any;
  documents: any[];
  journeyProgress: { progress: number; stage: string };
}

export const StatusCards = ({ activeCase, documents, journeyProgress }: StatusCardsProps) => {
  const urgentActions = [
    documents?.filter(d => d.status === 'rejected').length > 0 && "Fix rejected documents",
    !activeCase && "Start visa application",
    documents?.filter(d => d.status === 'uploaded').length > 0 && "Documents pending review"
  ].filter(Boolean);

  const upcomingEvents = [
    "Document deadline: March 15, 2025",
    "Health check appointment: March 20, 2025",
    "Consultation scheduled: March 10, 2025"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {/* Case Progress Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-trust-blue">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-trust-blue/10 to-trust-blue/5 rounded-xl">
              <FileText className="h-6 w-6 text-trust-blue" />
            </div>
            <Badge variant="secondary" className="bg-trust-blue/10 text-trust-blue border-trust-blue/20">
              {journeyProgress.stage}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Case Progress</h3>
            <Progress value={journeyProgress.progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">{journeyProgress.progress}% complete</p>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCase?.case_number || 'No active case'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Actions Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-action-orange">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-action-orange/10 to-action-orange/5 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-action-orange" />
            </div>
            <Badge variant="destructive" className="bg-action-orange text-white">
              {urgentActions.length}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Urgent Actions</h3>
            <div className="space-y-1">
              {urgentActions.length > 0 ? (
                urgentActions.slice(0, 2).map((action, index) => (
                  <p key={index} className="text-xs text-muted-foreground truncate">
                    • {action}
                  </p>
                ))
              ) : (
                <p className="text-xs text-success-green">All caught up! 🎉</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-confidence-purple">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-confidence-purple/10 to-confidence-purple/5 rounded-xl">
              <Calendar className="h-6 w-6 text-confidence-purple" />
            </div>
            <Badge variant="secondary" className="bg-confidence-purple/10 text-confidence-purple border-confidence-purple/20">
              3
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Upcoming Events</h3>
            <div className="space-y-1">
              {upcomingEvents.slice(0, 2).map((event, index) => (
                <p key={index} className="text-xs text-muted-foreground truncate">
                  • {event}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Status Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-success-green">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-success-green/10 to-success-green/5 rounded-xl">
              <Shield className="h-6 w-6 text-success-green" />
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-foreground">{documents?.length || 0}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Documents</h3>
            <div className="flex justify-between text-xs">
              <span className="text-success-green">
                {documents?.filter(d => d.status === 'verified').length || 0} verified
              </span>
              <span className="text-action-orange">
                {documents?.filter(d => d.status === 'uploaded').length || 0} pending
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary Card */}
      <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-energy-pink">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-energy-pink/10 to-energy-pink/5 rounded-xl">
              <DollarSign className="h-6 w-6 text-energy-pink" />
            </div>
            <Badge variant="secondary" className="bg-success-green/10 text-success-green border-success-green/20">
              Paid
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Payments</h3>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-foreground">$3,500 AUD</p>
              <p className="text-xs text-muted-foreground">Initial consultation paid</p>
              <p className="text-xs text-muted-foreground">Next: Application fee due</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};